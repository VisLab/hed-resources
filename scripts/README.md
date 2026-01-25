# HED Documentation Build Scripts

Cross-platform Python scripts for building and serving HED documentation.

## Available Scripts

### `build_docs.py` - Build Documentation
Builds the unified HED documentation by copying submodule docs and running Sphinx.

**Usage:**
```bash
# As installed command (after pip install -e .)
hed-build-docs

# Direct Python execution
python scripts/build_docs.py

# As module
python -m scripts.build_docs

# Via platform-specific wrapper
scripts\build-unified-docs.bat  # Windows
scripts/build-unified-docs.sh   # Unix/Linux/macOS
```

### `serve_docs.py` - Serve Documentation
Starts a local HTTP server to preview the built documentation.

**Usage:**
```bash
# As installed command (after pip install -e .)
hed-serve-docs

# Direct Python execution
python scripts/serve_docs.py

# As module
python -m scripts.serve_docs

# Via platform-specific wrapper
scripts\serve-docs.bat  # Windows
scripts/serve-docs.sh   # Unix/Linux/macOS
```

## Installation

Install the package in editable mode to register the commands:

```bash
pip install -e .
```

After installation, `hed-build-docs` and `hed-serve-docs` will be available as commands in your environment.

## Requirements

- Python 3.10+
- Dependencies from `pyproject.toml` [docs] group
- Virtual environment recommended

## Platform Support

All scripts work on:
- Windows (PowerShell, CMD)
- macOS (bash, zsh)
- Linux (bash)

The `.bat` and `.sh` files are convenience wrappers that activate the virtual environment and call the Python scripts.
