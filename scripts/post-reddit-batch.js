#!/usr/bin/env node
/**
 * Post all comments from MANUAL_POST_2026-02-13.md using Playwright.
 * Uses the same persistent profile as post-reddit-comment.js (log in once with login-reddit.js).
 *
 * Usage: node scripts/post-reddit-batch.js [path to MANUAL_POST file]
 * Default: MANUAL_POST_2026-02-13.md in project root
 */

const fs = require('fs');
const path = require('path');
const { getContext, postComment } = require('./post-reddit-comment.js');

function parseManualPostFile(content) {
  const entries = [];
  const urlRe = /^\*\*URL:\*\*\s*(https:\/\/old\.reddit\.com\/[^\s)]+)/gm;
  const blockRe = /^```\s*\n([\s\S]*?)```/gm;
  let match;
  const urls = [];
  while ((match = urlRe.exec(content)) !== null) urls.push(match[1]);
  while ((match = blockRe.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 10 && !text.startsWith('http')) entries.push({ comment: text });
  }
  // Pair URLs with comments: each ### block has one URL and one ``` comment ```
  const sections = content.split(/^### \d+\./m);
  const result = [];
  let urlIdx = 0;
  for (const section of sections) {
    const urlMatch = section.match(/\*\*URL:\*\*\s*(https:\/\/old\.reddit\.com\/[^\s)]+)/);
    const codeMatch = section.match(/```\s*\n([\s\S]*?)```/);
    if (urlMatch && codeMatch) {
      result.push({ url: urlMatch[1].trim(), comment: codeMatch[1].trim() });
    }
  }
  return result;
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const manualPath = process.argv[2] || path.join(projectRoot, 'MANUAL_POST_2026-02-13.md');
  const content = fs.readFileSync(manualPath, 'utf8');
  const items = parseManualPostFile(content);
  if (items.length === 0) {
    console.error('No URL+comment pairs found in', manualPath);
    process.exit(1);
  }
  console.log('Posting', items.length, 'comments...');
  const context = await getContext({ headless: false });
  const page = context.pages()[0] || await context.newPage();
  let done = 0;
  for (const { url, comment } of items) {
    try {
      await postComment(page, url, comment);
      done++;
      console.log(`[${done}/${items.length}] OK`);
    } catch (err) {
      console.error(`[${done + 1}/${items.length}] FAIL:`, err.message);
      if (err.message.includes('textarea not found') || err.message.includes('logged in')) {
        console.error('\n>>> Log in first: node scripts/login-reddit.js');
        await context.close();
        process.exit(1);
      }
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
