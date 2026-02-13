# Bug Report: MCP Tool Calls Rejected Without Approval Prompt

## Workaround (Use cursor-ide-browser)

**Fix:** Use **cursor-ide-browser** MCP instead of Playwright MCP. cursor-ide-browser works for the same actions (navigate, click, type, snapshot) and does not hit this approval bug. See SKILL.md and BATCH.md — the skill has been updated to reference cursor-ide-browser.

---

## Summary

MCP tool calls (Playwright browser_navigate and others) are rejected with "User rejected MCP: Review cancelled or failed" even though no approval prompt or UI element appears for the user to approve or reject the action.

## Environment

- **Cursor version:** [Please add: Cursor → About Cursor]
- **OS:** macOS
- **MCP server:** Playwright (`npx -y @playwright/mcp@latest`)

## Steps to Reproduce

1. Add Playwright MCP to Cursor (in `.cursor/mcp.json` or user-level `~/.cursor/mcp.json`)
2. Enable the Playwright MCP server in Cursor Settings → Tools & MCP
3. In Composer, ask the agent to use a Playwright tool (e.g. navigate to a URL)
4. Agent invokes `browser_navigate`
5. Tool call is rejected with "User rejected MCP: Review cancelled or failed"

## Expected Behavior

- An approval prompt, toast, or "Run" button appears so the user can approve or deny the MCP tool call
- After approval, the tool executes

## Actual Behavior

- No approval prompt, toast, or button appears anywhere in the UI
- The tool call is rejected with "User rejected MCP"
- User has no way to approve the action

## Additional Notes

- `alwaysAllow` array added to the Playwright MCP config does not resolve the issue
- Behavior is the same with project-level config (`.cursor/mcp.json`) and user-level config (`~/.cursor/mcp.json`)
- `cursor-ide-browser` MCP works and does not require approval for the same type of action
- Restarting Cursor and running "MCP: Restart Servers" does not fix the issue

## Suggested Fix

Either:
1. Show the approval prompt/UI when MCP tools are invoked so the user can approve, or
2. Honor the `alwaysAllow` parameter in MCP config so listed tools run without approval
