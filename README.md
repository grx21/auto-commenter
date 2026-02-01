# Auto-Commenter

<p align="center">
  <img src="assets/og_image.png" alt="Auto-Commenter - A Claude skill that automatically posts personalized, authentic comments in your target communities" width="100%">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Claude AI skill that writes comments indistinguishable from your actual writing style.

A marketing automation framework using Claude Skills and Playwright MCP for authentic community engagement. Features personalized comment generation, target community selection, daily tracking, batch execution, and lead identification.

**✨ Currently supports Reddit** — easily extensible to Twitter, LinkedIn, Discord, and other platforms by adding personalization files.

---

## What is This?

Auto-Commenter is a Claude AI skill that:
- **Learns your writing style** from your actual comments
- **Analyzes posts deeply** to understand context and intent (not keyword-based)
- **Writes authentic comments** that pass 16-point quality checklist
- **Tracks activity** across subreddits with daily quotas
- **Identifies leads** automatically based on your product fit
- **Runs in batch mode** to fill daily quotas across multiple communities

Unlike typical bots that produce obvious automated comments, this system replicates your unique voice and provides genuine value.

---

## Quick Start

### 1. Installation

```bash
git clone https://github.com/rokpiy/auto-commenter.git
cd auto-commenter
npm install
```

### 2. Configure Your Style

**Create personalization file:**
1. Collect 8-10 comments you've written (various topics, lengths, tones)
2. Ask your LLM: *"Analyze these comments and create a personalization guide"*
3. Paste the result into `.claude/skills/reddit-commenter/resources/personalization_reddit.md`

### 3. Customize Target Communities

**Configure subreddits:**
1. Ask your LLM to analyze your target subreddits
2. Paste community rules, tone, and good topics into `.claude/skills/reddit-commenter/resources/subreddits.md`

**Optional - Add product info:**
- If promoting a product, add details to `.claude/skills/reddit-commenter/resources/product.md`

### 4. Run

**Single comment:**
```
"Write one comment on r/YourSubreddit"
```

**Batch mode (fill daily quota):**
```
"Fill today's quota"
```

📖 **Detailed setup:** See [SETUP.md](SETUP.md)

---

## Project Structure

```
auto-commenter/
├── .claude/skills/reddit-commenter/
│   ├── SKILL.md                      # Single comment workflow
│   ├── BATCH.md                      # Batch mode execution
│   └── resources/
│       ├── personalization_reddit.md # YOUR writing style (customize this)
│       ├── subreddits.md             # Target community analysis
│       └── product.md                # Your product info (optional)
├── tracking/reddit/                  # Daily activity logs
├── leads/reddit.md                   # Discovered potential customers
├── SETUP.md                          # Detailed setup guide
└── CONTRIBUTING.md                   # Contribution guidelines
```

---

## Key Features

- ✅ **Style Personalization** - 16-point checklist ensures natural, human-like comments
- ✅ **Batch Execution** - Automatically fills daily quotas (e.g., 24 comments across 8 subreddits)
- ✅ **Lead Identification** - Tracks potential customers interested in your product
- ✅ **Activity Tracking** - Daily logs with comment links and metrics
- ✅ **Multi-Platform Ready** - Extend to Twitter, LinkedIn, Discord by adding personalization files
- ✅ **Community-Respectful** - Follows rate limits, subreddit rules, and provides real value

---

## Usage

### Single Comment
```
"Write one comment on r/ClaudeAI"
```
→ Analyzes posts, writes in your style, reviews quality, posts, tracks

### Batch Mode
```
"Fill today's quota"
```
→ Fills all subreddit quotas (default: 3 per subreddit, 5-15 min intervals)

### Check Activity
```
"Show today's Reddit activity"
```
→ View tracking file: `tracking/reddit/2026-01-30.md`

---

## Multi-Platform Support

Currently supports **Reddit**. To add other platforms:

1. Copy `.claude/skills/reddit-commenter/` → `.claude/skills/[platform]-commenter/`
2. Customize `personalization_[platform].md` with platform-specific style
3. Update `SKILL.md` and `BATCH.md` for platform APIs/browser automation
4. Create `tracking/[platform]/` and `leads/[platform].md`

**Coming soon:** Twitter, LinkedIn, Discord templates

---

## Documentation

- 📖 [SETUP.md](SETUP.md) - Complete setup guide
- 📖 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Commands and tips
- 📖 [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- 📖 [CHANGES.md](CHANGES.md) - Conversion to open-source summary

---

## Responsible Use

⚠️ **This tool enhances genuine engagement, not replaces it.**

**Do:**
- Provide real value to communities
- Use your authentic writing style
- Follow platform rules and rate limits
- Mix in manual comments

**Don't:**
- Spam or deceive communities
- Claim false experiences
- Ignore negative feedback
- Automate 100% of activity

See [Responsible Use Guidelines](SETUP.md#responsible-use) for details.

---

## License

MIT License - see [LICENSE](LICENSE)

---

## Support

- 🐛 [Report Bug](../../issues/new?template=bug_report.md)
- 💡 [Request Feature](../../issues/new?template=feature_request.md)
- 🤝 [Contribute](CONTRIBUTING.md)
- 📖 [Setup Help](SETUP.md)

---

**Built with [Claude AI](https://claude.ai) and [Playwright MCP](https://github.com/executeautomation/playwright-mcp)**
