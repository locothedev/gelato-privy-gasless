#!/usr/bin/env bash

# Exit on error
set -e

echo "Setting up gelato-ui submodule for Vercel deployment..."

# Remove existing directory if it exists
if [ -d "packages/gelato-ui" ]; then
  echo "Removing existing packages/gelato-ui directory..."
  rm -rf packages/gelato-ui
fi

# Create packages directory if it doesn't exist
mkdir -p packages

# Clone the repository directly
echo "Cloning gelato-ui repository..."
git clone https://locothedev:${GITHUB_REPO_CLONE_TOKEN}@github.com/locothedev/gelato-ui.git packages/gelato-ui

# Remove the .git directory to avoid submodule issues
echo "Cleaning up git metadata..."
rm -rf packages/gelato-ui/.git

echo "Submodule setup complete!"