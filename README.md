[![Documentation](https://img.shields.io/badge/docs-hedtags.org-blue.svg)](https://www.hedtags.org/hed-resources)

# HED Resources

This repository contains the primary documentation and user resources for the Hierarchical Event Descriptor (HED) system for annotating, summarizing, and analyzing data.

## Repository contents

The [docs](https://github.com/hed-standard/hed-resources/tree/main/docs) directory contains the source documentation for HED resources, tools, and tutorials.

The documentation covers:

- Introduction to HED and how to use it
- Links-to-tool-specific guides (Python, MATLAB, JavaScript, Online tools)
- Integration guides (EEGLAB, NWB, BIDS)
- Validation and search guides
- Schema development guides
- Quick-start tutorials and examples

The [HED GitHub organization](https://github.com/hed-standard/) gathers all HED supporting resources, which are open source.

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

## Integrating submodule documentation

This repository uses git submodules to integrate documentation from other HED repositories (like hed-python) into a unified documentation site with cross-repository search.

### Adding a new submodule

To integrate documentation from a new HED repository:

1. **Add the git submodule**:

   ```bash
   git submodule add https://github.com/hed-standard/REPO-NAME.git submodules/REPO-NAME
   git submodule update --init --recursive
   ```

2. **Configure the build script** (`docs/build_unified.py`):

   Add your submodule to the `submodules` dictionary with the files/directories to copy:

   ```python
   submodules = {
       "hed-python": {
           "source": submodules_dir / "hed-python" / "docs",
           "dest": source_dir / "hed-python",
           "files": ["index.rst", "overview.md", "user_guide.md", "api/"],
       },
       "your-repo": {
           "source": submodules_dir / "your-repo" / "docs",
           "dest": source_dir / "your-repo",
           "files": ["index.rst", "guide.md"],  # List files to copy
       },
   }
   ```

3. **Update Sphinx configuration** (`docs/source/conf.py`):

   Add paths for submodule documentation:

   ```python
   submodule_docs = {
       "hed-python": submodules_base / "hed-python" / "docs",
       "your-repo": submodules_base / "your-repo" / "docs",
   }

   submodule_sources = {
       "hed-python": submodules_base / "hed-python",
       "your-repo": submodules_base / "your-repo",
   }
   ```

4. **Add search result labels** (`docs/source/_static/search_labels.js`):

   Add your repository to the color configuration and set its sort order:

   ```javascript
   const repoConfig = {
       'hed-python/': {
           label: '[hed-python]',
           color: '#b8860b',  // goldenrod
           order: 2
       },
       'your-repo/': {
           label: '[your-repo]',
           color: '#ff6347',  // Choose a distinct color
           order: 3  // Higher numbers appear later in search results
       },
       'default': {
           label: '[hed-resources]',
           color: '#0969da',  // blue
           order: 1  // Appears first in search results
       }
   };
   ```

   The `order` field controls the grouping of search results - lower numbers appear first. Results within each repository are sorted by relevance score.

5. **Add to main documentation navigation** (`docs/source/index.rst`):

   Include your submodule in the table of contents:

   ```rst
   .. toctree::
      :maxdepth: 2
      :caption: Tool Documentation:
      
      hed-python/index
      your-repo/index
   ```

6. **Test the integration**:

   ```bash
   hed-build-docs
   hed-serve-docs
   # Navigate to http://localhost:8000 and test search
   ```

   **Note**: Use `hed-serve-docs` to preview the documentation rather than opening `docs/_build/html/index.html` directly in your browser. The local server ensures that search functionality, cross-references, and other JavaScript features work correctly.

### Updating submodules

To update a submodule to the latest version from its remote repository:

```bash
# Update specific submodule
git submodule update --remote submodules/REPO-NAME

# Or update all submodules
git submodule update --remote

# Rebuild documentation to pick up changes
hed-build-docs
```

If you have local uncommitted changes in a submodule:

```bash
# Discard local changes and update
cd submodules/REPO-NAME
git restore .
git pull
cd ../..
hed-build-docs
```
