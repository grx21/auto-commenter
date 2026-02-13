#!/usr/bin/env node
/**
 * Fill today's Reddit quota: open browser for login, then post all comments.
 * One run: window opens → log in to Reddit → press Enter in terminal → all comments post.
 *
 * Usage: node scripts/fill-quota.js [path to MANUAL_POST file]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { getContext, postComment } = require('./post-reddit-comment.js');

function parseManualPostFile(content) {
  const sections = content.split(/^### \d+\./m);
  const result = [];
  for (const section of sections) {
    const urlMatch = section.match(/\*\*URL:\*\*\s*(https:\/\/old\.reddit\.com\/[^\s)]+)/);
    const codeMatch = section.match(/```\s*\n([\s\S]*?)```/);
    if (urlMatch && codeMatch) {
      result.push({ url: urlMatch[1].trim(), comment: codeMatch[1].trim() });
    }
  }
  return result;
}

function waitForEnter() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('Press Enter when you\'ve logged in to Reddit in the browser... ', () => {
      rl.close();
      resolve();
    });
  });
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const manualPath = process.argv[2] || path.join(projectRoot, 'MANUAL_POST_2026-02-13.md');
  if (!fs.existsSync(manualPath)) {
    console.error('Not found:', manualPath);
    process.exit(1);
  }
  const content = fs.readFileSync(manualPath, 'utf8');
  const items = parseManualPostFile(content);
  if (items.length === 0) {
    console.error('No URL+comment pairs in', manualPath);
    process.exit(1);
  }

  console.log('Opening browser. Log in to Reddit in the window that appears.');
  const context = await getContext({ headless: false });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://old.reddit.com/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await waitForEnter();

  console.log('Posting', items.length, 'comments...');
  let done = 0;
  for (const { url, comment } of items) {
    try {
      await postComment(page, url, comment);
      done++;
      console.log(`[${done}/${items.length}] OK`);
    } catch (err) {
      console.error(`[${done + 1}/${items.length}] FAIL:`, err.message);
    }
    await page.waitForTimeout(2000);
  }
  await context.close();
  console.log('Done.', done, '/', items.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
