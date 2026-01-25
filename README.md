[![Documentation](https://img.shields.io/badge/docs-hedtags.org-blue.svg)](https://www.hedtags.org/hed-resources)

# HED Resources

This repository contains the primary documentation and user resources for the Hierarchical Event Descriptor (HED) system for annotating, summarizing, and analyzing data.

## Repository contents

The [**docs**](https://github.com/hed-standard/hed-resources/tree/main/docs) directory contains the source documentation for HED resources, tools, and tutorials.

The documentation covers:

- Introduction to HED and how to use it
- Links-to-tool-specific guides (Python, MATLAB, JavaScript, Online tools)
- Integration guides (EEGLAB, NWB, BIDS)
- Validation and search guides
- Schema development guides
- Quick-start tutorials and examples

The [**HED GitHub organization**](https://github.com/hed-standard/) gathers all HED supporting resources, which are open source.

## Development setup

To set up a development environment for building and contributing to the documentation:

```bash
# Clone the repository
git clone https://github.com/hed-standard/hed-resources.git
cd hed-resources

# Install in development mode with all dependencies
pip install -e .[dev]

# Build unified documentation (copies submodule docs + builds with Sphinx)
hed-build-docs
# Or: python scripts/build_docs.py
# Or: scripts/build-unified-docs.bat (Windows)
# Or: scripts/build-unified-docs.sh (Unix/Linux/macOS)

# Serve documentation locally for preview
hed-serve-docs
# Or: python scripts/serve_docs.py
# Or: scripts/serve-docs.bat (Windows)
# Or: scripts/serve-docs.sh (Unix/Linux/macOS)

# Check links
sphinx-build -b linkcheck docs/source docs/_build/linkcheck
```

### Available commands:

After `pip install -e .`, these commands are available:
- `hed-build-docs` - Build unified documentation
- `hed-serve-docs` - Serve documentation locally at http://localhost:8000

See [scripts/README.md](scripts/README.md) for detailed usage information.

### Available dependency groups:

- `docs` - Sphinx documentation building
- `quality` - Link checking and code quality tools
- `dev` - All of the above for development

### Building documentation

The documentation is built using Sphinx with the Furo theme and hosted at [www.hedtags.org/hed-resources](https://www.hedtags.org/hed-resources). After building locally, open `docs/_build/html/index.html` in your browser to view the documentation.
