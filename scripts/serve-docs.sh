#!/usr/bin/env bash
# Serve HED documentation locally
# Cross-platform shell script for Unix/Linux/macOS

set -e  # Exit on error

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Change to repository root
cd "$REPO_ROOT"

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Run the cross-platform Python serve script
python "$SCRIPT_DIR/serve_docs.py"
