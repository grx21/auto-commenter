#!/usr/bin/env node
/**
 * Post a single Reddit comment via Playwright.
 * Uses persistent browser context - requires manual login on first run.
 * Run: node scripts/login-reddit.js once to log in, then run this script.
 *
 * Usage: node scripts/post-reddit-comment.js <post_url> "<comment_text>"
 * Example: node scripts/post-reddit-comment.js "https://old.reddit.com/r/artificial/comments/1r3bj6a/..." "your comment here"
 */

const { chromium } = require('@playwright/test');

const USER_DATA_DIR = process.env.REDDIT_BROWSER_PROFILE || require('path').join(require('os').tmpdir(), 'reddit-playwright-profile');
const HEADLESS = process.env.HEADLESS !== '0' && process.env.HEADLESS !== 'false';

async function getContext(options = {}) {
  return chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: options.headless ?? HEADLESS,
    channel: 'chrome',
    args: ['--no-sandbox'],
    ...options,
  });
}

async function postComment(page, postUrl, commentText) {
  await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1500);

  // Old Reddit: multiple possible selectors for the main comment textarea
  const textareaSelectors = [
    'form.userform textarea',
    '.usertext-edit textarea',
    'textarea[name="text"]',
    '#usertext-edit',
    'div.usertext-edit textarea',
    'form textarea',  // fallback: first textarea in any form
  ];
  let textarea = null;
  for (const sel of textareaSelectors) {
    const el = page.locator(sel).first();
    try {
      await el.waitFor({ state: 'visible', timeout: 6000 });
      textarea = el;
      break;
    } catch {
      continue;
    }
  }
  if (!textarea) {
    // One more try: scroll down and wait (form may be below fold)
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1500);
    const anyTextarea = page.locator('textarea').first();
    try {
      await anyTextarea.waitFor({ state: 'visible', timeout: 4000 });
      textarea = anyTextarea;
    } catch {
      throw new Error('Comment textarea not found. Are you logged into Reddit? Run: node scripts/login-reddit.js');
    }
  }
  await textarea.scrollIntoViewIfNeeded();
  await textarea.fill(commentText);

  // Submit: try selectors first, then submit via JS (same form as textarea)
  const saveSelectors = [
    'form.userform input[type="submit"]',
    'form.userform button[type="submit"]',
    'input[type="submit"][value="save"]',
    'input[type="submit"][value="comment"]',
    '.usertext-edit ~ .buttons input[type="submit"]',
    '.usertext-edit ~ .buttons button',
  ];
  let saved = false;
  for (const sel of saveSelectors) {
    try {
      const btn = page.locator(sel).first();
      await btn.waitFor({ state: 'visible', timeout: 2000 });
      await btn.click();
      saved = true;
      break;
    } catch {
      continue;
    }
  }
  if (!saved) {
    // REQUIRED: Old Reddit often doesn't expose the submit button to normal selectors.
    // This JS fallback finds the form containing the comment textarea and clicks its
    // submit button. Do not remove — posting fails without it.
    await page.evaluate(() => {
      const ta = document.querySelector('form textarea[name="text"], form textarea, .usertext-edit textarea');
      if (ta && ta.form) {
        const submit = ta.form.querySelector('input[type="submit"], button[type="submit"]');
        if (submit) submit.click();
      }
    });
  }

  await page.waitForTimeout(2500);
}

async function main() {
  const [postUrl, commentText] = process.argv.slice(2);
  if (!postUrl || !commentText) {
    console.error('Usage: node scripts/post-reddit-comment.js <post_url> "<comment_text>"');
    process.exit(1);
  }

  const context = await getContext({ headless: false });
  try {
    const page = context.pages()[0] || await context.newPage();
    await postComment(page, postUrl, commentText);
    console.log('Comment posted.');
  } finally {
    await context.close();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { getContext, postComment, USER_DATA_DIR };
