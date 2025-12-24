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

# Build documentation using Sphinx
sphinx-build -b html docs/source docs/_build/html

# Serve documentation locally for preview (requires Python's http.server)
python -m http.server 8000 -d docs/_build/html

# Check links
sphinx-build -b linkcheck docs/source docs/_build/linkcheck
```

### Available dependency groups:

- `docs` - Sphinx documentation building
- `quality` - Link checking and code quality tools
- `dev` - All of the above for development

### Building documentation

The documentation is built using Sphinx with the Furo theme and hosted at [www.hedtags.org/hed-resources](https://www.hedtags.org/hed-resources). After building locally, open `docs/_build/html/index.html` in your browser to view the documentation.
