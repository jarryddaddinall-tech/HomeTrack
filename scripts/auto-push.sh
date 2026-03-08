#!/usr/bin/env bash
# Auto-commit and push every 5 min (run via launchd).
# Git must be able to push without prompting (SSH key or credential helper).

set -e
REPO="/Users/jarrydaddinall/Documents/2026-HomeClear-Version"
cd "$REPO"

# Nothing to do if no changes
if git status --porcelain | grep -q .; then
  git add -A
  git commit -m "Auto-save: $(date '+%Y-%m-%d %H:%M')"
  git push
fi
