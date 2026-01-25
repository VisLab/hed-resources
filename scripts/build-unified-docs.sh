#!/usr/bin/env bash
# Build unified HED documentation
# Cross-platform shell script for Unix/Linux/macOS

set -e  # Exit on error

echo "======================================"
echo "Building Unified HED Documentation"
echo "======================================"
echo

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Change to repository root
cd "$REPO_ROOT"

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    echo "Activating virtual environment..."
    source .venv/bin/activate
else
    echo "Warning: Virtual environment not found at .venv/"
    echo "Consider creating one with: python -m venv .venv"
    echo
fi

# Run the cross-platform Python build script
python "$SCRIPT_DIR/build_docs.py"
