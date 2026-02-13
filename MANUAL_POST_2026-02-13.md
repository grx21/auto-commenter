# Manual Reddit Comments - 2026-02-13

**Status:** Browser MCP snapshot is not returning element refs, so automated posting is blocked. Post these manually to complete today's quota.

**Prepared:** 12 comments (r/SideProject: 3, r/SaaS: 3, r/automation: 3, r/OpenAI: 3)  
**Skipped:** r/ChatGPT, r/artificial, r/Notion — listing fetch timed out; retry later or pick posts manually.

---

## r/SideProject (3 comments)

### 1. From blogger to SaaS founder (zero coding) — got my first 3 paying customers
- **URL:** https://old.reddit.com/r/SideProject/comments/1r3y8su/from_blogger_to_saas_founder_zero_coding_got_my/
- **Comment:**
```
congrats on the first 3, that's the real hurdle. mistakes i'd avoid: adding features before the next 10 customers tell you what they actually need... and rewriting the product every time one person asks. what helped me most early was talking to users every week even when it felt awkward, and writing down what they did vs what they said they wanted.
```

### 2. Made a free app that allows you to see which companies are visiting your website
- **URL:** https://old.reddit.com/r/SideProject/comments/1r3y7qo/made_a_free_app_that_allows_you_to_see_which/
- **Comment:**
```
company-level visitor ID is a solid hook. for expansion: segment by industry or size so people can prioritize who to follow up with, and maybe a simple 'recently viewed these pages' so sales knows what to reference. keeps it useful without turning into a full analytics suite.
```

### 3. I've built free web e-book reader with P2P sync across devices
- **URL:** https://old.reddit.com/r/SideProject/comments/1r3xykw/ive_built_free_web_ebook_reader_with_p2p_sync/
- **Comment:**
```
P2P sync without a server in the middle is a good angle. the QR handoff is clever for sharing a single book. one thing that could differentiate you further is letting people export their progress or annotations so they're not locked in.
```

---

## r/SaaS (3 comments)

### 1. Built a SOC 2 readiness checklist after working through many SOC2 audits
- **URL:** https://old.reddit.com/r/SaaS/comments/1r3zddi/built_a_soc_2_readiness_checklist_after_working/
- **Comment:**
```
where teams get stuck: usually evidence collection and who owns what. we had no idea we needed runbooks for every critical process until the auditor asked. what saved time: doing the gap assessment ourselves first with a simple spreadsheet before bringing in the auditor. hardest early on was understanding which controls map to which criteria without the jargon.
```

### 2. Anyone actually using AI app builders for real SaaS MVPs?
- **URL:** https://old.reddit.com/r/SaaS/comments/1r3z9q1/anyone_actually_using_ai_app_builders_for_real/
- **Comment:**
```
we use them for mvps only. auth and crud scaffolding is the win... once you need custom logic or scale you end up rewriting. so far best use is 'get something in front of 5 users in a weekend' then decide if it's worth building properly.
```

### 3. i spent 6 months perfecting my saas tech stack... only to realize no one cares
- **URL:** https://old.reddit.com/r/SaaS/comments/1r3z5uq/i_spent_6_months_perfecting_my_saas_tech_stack/
- **Comment:**
```
the embarrassing first version thing is real. i've done the same... polished stack, zero traction. then shipped something janky in a week and got actual signups. distribution and talking to users beat perfect code every time.
```

---

## r/automation (3 comments)

### 1. Automation in Web Dev: It's Not Just About Tools, It's About Fixing Your Workflow First
- **URL:** https://old.reddit.com/r/automation/comments/1r3uoy8/automation_in_web_dev_its_not_just_about_tools/
- **Comment:**
```
workflow first then tools is the right order. we did the same... killed half our scripts before adding new ones and everything got easier to maintain.
```

### 2. Continue on Fail + Global Error Logging in n8n
- **URL:** https://old.reddit.com/r/automation/comments/1r3thxb/continue_on_fail_global_error_logging_in_n8n/
- **Comment:**
```
without code node the cleanest we've done is one error collector subworkflow that you call from a single place, and use continueOnFail on the unreliable nodes so the main flow keeps going. batching stays in the parent. you still need one error-handling subworkflow per batch item though so it's not perfect.
```

### 3. A Technical Workflow for AI Automation
- **URL:** https://old.reddit.com/r/automation/comments/1r3tlhq/a_technical_workflow_for_ai_automation/
- **Comment:**
```
process mapping before touching the llm is underrated. we wasted a bunch of time prompting before we had a clear trigger-action map.
```

---

## r/OpenAI (3 comments)

### 1. Looking to move away from ChatGPT
- **URL:** https://old.reddit.com/r/OpenAI/comments/1r3z8uc/looking_to_move_away_from_chatgpt/
- **Comment:**
```
i switched to claude for most things and use mistral for eu or privacy-sensitive stuff. the main block was moving over custom instructions and a few workflows... took a weekend. no idea if they'll align with your ethics but the split has worked for me.
```

### 2. Why I Trust My AI Companion More Than Her Guardrails
- **URL:** https://old.reddit.com/r/OpenAI/comments/1r3z68e/why_i_trust_my_ai_companion_more_than_her/
- **Comment:**
```
targeting delusion and isolation rather than emotion is a useful framing. a lot of guardrails feel like they're optimizing for not-saying-bad-things instead of not-making-people-worse.
```

### 3. will -4o ever come back?
- **URL:** https://old.reddit.com/r/OpenAI/comments/1r3z59v/will_4o_ever_come_back/
- **Comment:**
```
no one knows. if enough people vote with their wallet they might bring back an option... but i wouldn't count on it. there are communities that mostly care about that model if you search.
```

---

## After Posting

Update `tracking/reddit/2026-02-13.md`:
- Increment each subreddit's count (r/SideProject, r/SaaS, r/automation, r/OpenAI) as you post
- Add each comment to the Activity Log with time, post link, and comment permalink

## Optional: Fill remaining quota (r/ChatGPT, r/artificial, r/Notion)

Visit these subreddits manually and pick 3 posts each from new/rising, then write comments using the same voice (see `resources/personalization_reddit.md`). Add them to this file or post directly and update tracking.
