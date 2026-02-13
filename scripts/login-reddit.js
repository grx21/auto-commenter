#!/usr/bin/env node
/**
 * Open Reddit in the Playwright persistent profile so you can log in.
 * Run this once; after you log in and close the window, post-reddit-comment.js
 * and post-reddit-batch.js will use the same session.
 *
 * Usage: node scripts/login-reddit.js
 */

const { getContext, USER_DATA_DIR } = require('./post-reddit-comment.js');

async function main() {
  console.log('Opening Reddit in a Chrome window.');
  console.log('Profile:', USER_DATA_DIR);
  console.log('');
  console.log('1. Log in to Reddit in that window (old.reddit.com).');
  console.log('2. When done, close the Chrome window or wait 5 minutes.');
  console.log('');
  const context = await getContext({ headless: false });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://old.reddit.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300000); // 5 min to log in
  await context.close();
  console.log('Closed. You can now run: node scripts/post-reddit-batch.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
