#!/usr/bin/env node
/**
 * Validates a Reddit comment for style rules (e.g. no em-dashes).
 * Exits 0 if valid, 1 if invalid (so CI or pre-post checks can fail the run).
 *
 * Usage:
 *   node scripts/validate-reddit-comment.js "Your comment text here"
 *   echo "Your comment" | node scripts/validate-reddit-comment.js
 */

const EM_DASH = '\u2014'; // —

function getStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) resolve(null);
    else {
      const chunks = [];
      process.stdin.on('data', (ch) => chunks.push(ch));
      process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }
  });
}

function validate(comment) {
  const index = comment.indexOf(EM_DASH);
  if (index === -1) return { valid: true };
  const snippet = comment.slice(Math.max(0, index - 20), index + 25);
  return {
    valid: false,
    message: `Comment contains em-dash (—) at position ${index}. Use comma, period, or hyphen instead. Snippet: "...${snippet}..."`,
  };
}

async function main() {
  let text = process.argv[2];
  if (text === undefined) {
    text = await getStdin();
  }
  if (text == null || text.trim() === '') {
    console.error('Usage: node scripts/validate-reddit-comment.js "comment text"');
    console.error('   or: echo "comment text" | node scripts/validate-reddit-comment.js');
    process.exit(2);
  }

  const result = validate(text);
  if (result.valid) {
    process.exit(0);
  }
  console.error('validate-reddit-comment: FAIL');
  console.error(result.message);
  process.exit(1);
}

main();
