# Reddit Commenter - Batch Mode

> Executed when "Fill today's quota" command given
> See SKILL.md for single comment workflow

---

## Batch Execution Trigger

Start batch mode with these commands:
- "Fill today's quota"
- "Consume all remaining quota"
- "Run in batch mode"

---

## Posting (use Playwright script)

When posting comments, use the project scripts so posting works reliably:

- **Single:** `node scripts/post-reddit-comment.js "<post_url>" "<comment text>"`
- **Batch:** `node scripts/post-reddit-batch.js` (uses `MANUAL_POST_YYYY-MM-DD.md`; create from template if needed)
- **Login once:** `node scripts/login-reddit.js` if the batch reports "textarea not found"

The script `scripts/post-reddit-comment.js` includes a **JS form-submit fallback** (submit via `page.evaluate` on the form containing the textarea). This is required for old Reddit; do not remove it.

---

## Pre-Start Check

```
1. Check tracking/reddit/today's-date.md (create from template.md if missing)
2. Check current comment count by subreddit
3. Calculate remaining quota:
   - Total 21 (7 subreddits × 3)
   - Subtract today's written comments
   - Remaining quota = 21 - Today's written comments
```

---

## Cost Controls

These rules apply to every comment in the batch to minimize token usage:

| Rule | Detail |
|------|--------|
| **Snapshot caps** | Max 2 per listing page, max 2 per post page. Skip if elements missing after that |
| **Candidate cap** | Only review first 5 posts in new/ or rising/. No match = skip subreddit |
| **Read only what's needed** | OP + top-level comments only — avoid deep reply threads |
| **Don't re-check Reddit** | Rely on the tracking file to know what was already commented |
| **Shortlist before navigating** | Pick up to 3 candidate posts from listing before navigating to any |
| **Draft loop cap** | Max 1 revision per comment. Still failing personalization = skip post |
| **Minimal MCP payloads** | Fixed format: `"Navigate to [URL]"`, `"Click [ref]"`, `"Type: [text]"` — never pass context |
| **Use cursor-ide-browser** | Playwright MCP fails with "User rejected MCP" in Cursor. Use cursor-ide-browser MCP instead. |
| **Lazy resource reads** | Only read large files (personalization_reddit.md, etc.) when actively needed, not upfront |

---

## Batch Workflow

```
[Start]
    ↓
[1] Check tracking file (/tracking/reddit/(today's date).md) → Calculate remaining quota
    ↓
[2] Select subreddit under quota (by priority criteria)
    → Check subreddit specifics in resources/subreddits.md:
      rules, community nature, good topics to answer
    ↓
[3] Start activity loop for that subreddit
    ↓
    [3-1] Execute SKILL.md Step 2-8 (comment on existing posts).
    ↓
    [3-2] Update tracking file
    ↓
    [3-3] Report progress
    ↓
    [3-4] Check that subreddit's quota
          - Under 3 → back to [3-1]
          - Completed 3 → to [4]
          - No suitable posts → to [4]
    ↓
[4] Move to next subreddit
    ↓
[5] Check overall termination condition
    ↓
    YES → [End]
    NO  → Return to [2]
```

---

## Subreddit Selection Priority

| Priority | Criteria | Reason |
|----------|----------|--------|
| 1 | Subreddits with 0 activity today | Ensure variety |
| 2 | Subreddits with oldest last activity time | Distributed activity |
| 3 | Subreddits with available quota | Efficiency |

---

### Execution Example

```
Start r/SideProject
  → Comment 1/3 written
  → Comment 2/3 written
  → Comment 3/3 written ✓

r/SideProject complete → Move to r/SaaS

Start r/SaaS
  → Comment 1/3 written
  → Comment 2/3 written
  → Comment 3/3 written ✓

r/SaaS complete → Move to r/automation
```

---

## Termination Conditions

Batch execution terminates when one of the following is met:

1. **Quota complete**: All subreddit quotas complete (7 × 3 = 21)
2. **No posts**: No suitable posts in all subreddits
3. **User interruption**: User requests stop
4. **Error occurred**: After 3 consecutive failures

---

### Progress Report
```
---
[Overall Progress] 6/21 completed

Completed subreddits:
✓ r/SideProject: 3/3
✓ r/SaaS: 3/3

In progress:
→ r/automation: 0/3 (current)

Waiting:
- r/ChatGPT: 0/3
- r/OpenAI: 0/3
- r/artificial: 0/3
- r/Notion: 0/3

Next: Move to r/ChatGPT after r/automation quota complete
---
```

## Skip Conditions

When skipping specific subreddit:

**No suitable posts in New/Rising**: Skip if none after reviewing 5 posts

When skipping, report:
```
r/automation skipped - No suitable posts
→ Moving to r/ChatGPT
```

---

## Error Handling

| Error | Response |
|-------|----------|
| Page loading failure | Wait 30s then retry (max 3 times) |
| Comment posting failure | Move to next post |
| Login session expired | Stop batch, notify user |
| Rate limit detected | Wait 30 min then resume |

---

## Batch Completion Report

```
---
## Batch Completion Report

**Total Written**: 18/21
**Time Spent**: 2 hours 35 minutes

### Results by Subreddit
| Subreddit | Written | Skip Reason |
|-----------|---------|-------------|
| r/SideProject | 3/3 | - |
| r/SaaS | 3/3 | - |
| r/automation | 2/3 | No suitable posts |
| r/ChatGPT | 3/3 | - |
| r/OpenAI | 0/3 | All skipped (no automation discussion) |
| r/artificial | 2/3 | No suitable posts |
| r/Notion | 2/3 | No suitable posts |

### Potential Customers Discovered
- 2 (updated in leads/reddit.md)

### Special Notes
- r/OpenAI: All skipped due to no automation discussion posts today
---
```



> Single comment workflow (Step 1-8): See SKILL.md
> Personalization review: See resources/personalization_reddit.md
