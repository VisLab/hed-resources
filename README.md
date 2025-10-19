[![Documentation](https://img.shields.io/badge/docs-hedtags.org-blue.svg)](https://www.hedtags.org/hed-resources)
# HED Resources

This repository contains the primary documentation and user resources
for the Hierarchical Event Descriptor (HED) system for
annotating, summarizing, and analyzing data.

## Repository contents

The [**docs**](https://github.com/hed-standard/hed-resources/tree/main/docs)
directory contains the source documentation for HED resources, tools, and tutorials.
This includes comprehensive guides for using HED tools, MATLAB support, Python tools,
and integration with various platforms like EEGLAB and NWB.

The documentation covers:
- Introduction to HED and how to use it
- Tool-specific guides (Python, MATLAB, JavaScript, Online tools)
- Integration guides (EEGLAB, NWB, BIDS)
- Validation and search guides  
- Schema development guides
- Quick-start tutorials and examples

The [**HED GitHub organization**](https://github.com/hed-standard/)
gathers all HED supporting resources, which are open source.

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

# Or use the provided scripts (Windows)
build-docs.bat          # Install dependencies and build docs
build-sphinx.bat        # Build docs only
check-links.bat         # Check for broken links

# Check links manually
python check_links.py
```

### Available dependency groups:
- `docs` - Sphinx documentation building
- `quality` - Link checking and code quality tools  
- `dev` - All of the above for development

### Building documentation
The documentation is built using Sphinx and hosted at [www.hedtags.org/hed-resources](https://www.hedtags.org/hed-resources).
After building locally, open `docs/_build/html/index.html` in your browser to view the documentation.


