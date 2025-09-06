#!/usr/bin/env bash
set -euo pipefail
 
# Move to the repo root
cd "$(git rev-parse --show-toplevel)"
 
# Ensure we’re not in a detached HEAD or bare repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a valid Git working tree."
  exit 1
fi
 
# Remove existing submodule entry (if any)
if git config --file .gitmodules --get-regexp "^submodule\.packages/gelato-ui\." > /dev/null 2>&1; then
  echo "Removing existing submodule config..."
  git submodule deinit -f packages/gelato-ui || true
  git rm -f packages/gelato-ui || true
  rm -rf .git/modules/packages/gelato-ui
fi
 
# Clean local packages/gelato-ui dir if needed
rm -rf packages/gelato-ui
 
# Add the submodule
echo "Adding submodule..."
git submodule add -f "https://locothedev:${GITHUB_REPO_CLONE_TOKEN}@github.com/locothedev/gelato-ui.git" packages/gelato-ui
 
# Sync & init
git submodule sync
git submodule update --init --recursive