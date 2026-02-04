[![Documentation](https://img.shields.io/badge/docs-hedtags.org-blue.svg)](https://www.hedtags.org/hed-resources) [![PyPI Version](https://img.shields.io/pypi/v/hed-resources.svg)](https://pypi.org/project/hed-resources/) [![License](https://img.shields.io/github/license/hed-standard/hed-resources.svg)](https://github.com/hed-standard/hed-resources/blob/main/LICENSE)

# HED Resources

This repository provides the **unified documentation and user resources** for the Hierarchical Event Descriptor (HED) system — a framework for annotating, summarizing, and analyzing experimental events and metadata in neuroscience and beyond.

## History and evolution

Originally, HED documentation was housed in the [hed-examples](https://github.com/hed-standard/hed-examples) repository alongside example datasets. In October 2025, the documentation was separated into this dedicated repository to better organize resources as the HED ecosystem grew.

With the development of the HED AI assistant and the expansion of HED tools across multiple platforms (Python, MATLAB, JavaScript), it became clear that a **unified documentation system** was essential. Previously, each HED repository maintained its own documentation independently, making it difficult for users to search across tools and understand the complete HED ecosystem.

**This repository (v1.0.0, released February 2026)** represents the first unified documentation build, integrating documentation from 9 separate HED repositories into a single, searchable documentation site with cross-repository search and consistent navigation.

## Repository contents

This repository serves two primary functions:

1. **Core HED documentation**: Main guides, tutorials, and reference materials about HED concepts, schemas, and usage
2. **Unified documentation hub**: Integration of tool-specific documentation from HED submodules

### Main documentation

The [docs/source](https://github.com/hed-standard/hed-resources/tree/main/docs/source) directory contains the core HED documentation organized into the following sections:

**Overview** — Start here to understand what HED is and how it can support your research. This section includes a 5-minute introduction to core HED concepts, role-specific workflows for different user types (experimenters, annotators, analysts, developers, and schema builders), an essential guide to annotation strategy and semantics, documentation on schema structure and organization, and updates on the latest developments in the HED ecosystem.

**Tutorials and guides** — Practical tutorials for getting started with HED annotation in different contexts (BIDS datasets, NWB files, and general annotation), plus comprehensive guides for validation processes, searching and querying annotations, generating summaries and analyses, and extracting experimental conditions and design matrices from HED-annotated data.

**Other resources** — Additional documentation including a complete index of all available documentation, guidance on understanding HED versions and compatibility, historical context about the evolution of HED, information about project governance structure, and conventions used throughout the documentation.

**Data resources** — Example datasets and test cases that demonstrate HED usage patterns and provide materials for testing and validation.

### Integrated submodule documentation

Through git submodules, this repository integrates documentation from:

- **[hed-python](https://github.com/hed-standard/hed-python)** — Python implementation and API
- **[hed-matlab](https://github.com/hed-standard/hed-matlab)** — MATLAB/EEGLAB tools
- **[hed-javascript](https://github.com/hed-standard/hed-javascript)** — JavaScript validator
- **[hed-web](https://github.com/hed-standard/hed-web)** — Online tools interface
- **[hed-schemas](https://github.com/hed-standard/hed-schemas)** — Schema development
- **[hed-mcp](https://github.com/hed-standard/hed-mcp)** — Model Context Protocol integration
- **[hed-vis](https://github.com/hed-standard/hed-vis)** — Visualization tools
- **[table-remodeler](https://github.com/hed-standard/table-remodeler)** — Table remodeling operations
- **[ndx-hed](https://github.com/hed-standard/ndx-hed)** — NWB extension

The unified build system (see below) automatically copies and integrates documentation from these submodules, enabling unified search and navigation across the entire HED ecosystem.

### Published documentation

The complete documentation is built with Sphinx and published at: **[www.hedtags.org/hed-resources](https://www.hedtags.org/hed-resources)**

Features include:

- Unified search across all HED documentation
- Cross-repository navigation and references
- Dark mode support
- Responsive design for mobile and desktop
- Copy buttons for code examples
- Comprehensive API documentation

Visit the [HED GitHub organization](https://github.com/hed-standard/) to explore all HED supporting repositories, which are open source and community-driven.

## Development setup

To set up a development environment for building and contributing to the documentation:

```bash
# Clone the repository
git clone https://github.com/hed-standard/hed-resources.git
cd hed-resources

# Install in development mode with documentation dependencies
pip install -e .[docs]

# Or install with both documentation and quality tools
pip install -e .[docs,quality]

# Build unified documentation (copies submodule docs + builds with Sphinx)
hed-build-docs
# Or: python scripts/build_docs.py

# Serve documentation locally for preview
hed-serve-docs
# Or: python scripts/serve_docs.py

# Check links
sphinx-build -b linkcheck docs/source docs/_build/linkcheck
```

### Available commands:

After `pip install -e .`, these commands are available:

- `hed-build-docs` - Build unified documentation
- `hed-serve-docs` - Serve documentation locally at http://localhost:8000

See [scripts/README.md](scripts/README.md) for detailed usage information.

### Available dependency groups:

- `docs` - Sphinx and documentation building tools
- `quality` - Link checking, linting, and code quality tools

Install both groups for full development setup: `pip install -e .[docs,quality]`

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

   **What this does automatically**:

   - Clones the repository to `submodules/REPO-NAME`
   - Updates `.gitmodules` with the new submodule entry
   - Stages the submodule gitlink entry in the git index

   **Commit the changes**:

   ```bash
   git commit -m "Add REPO-NAME submodule"
   ```

   This commits both the updated `.gitmodules` file and the submodule gitlink.

2. **Configure the build script** (`docs/build_unified.py`):

   Add your submodule to the `submodules` dictionary with the files/directories to copy:

   ```python
   submodules = {
       "hed-python": {
           "source": submodules_dir / "hed-python" / "docs",
           "dest": source_dir / "hed-python",
           "files": ["index.rst", "overview.md", "user_guide.md", "api/"],
       },
       "table-remodeler": {
           "source": submodules_dir / "table-remodeler" / "docs",
           "dest": source_dir / "table-remodeler",
           "files": ["index.rst", "overview.md", "quickstart.md", "user_guide.md", "custom_operations.md", "operations/", "api/"],
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
       "table-remodeler": submodules_base / "table-remodeler" / "docs",
       "your-repo": submodules_base / "your-repo" / "docs",
   }

   submodule_sources = {
       "hed-python": submodules_base / "hed-python",
       "table-remodeler": submodules_base / "table-remodeler",
       "your-repo": submodules_base / "your-repo",
   }
   ```

4. **Update GitHub icon fix script** (`docs/source/_static/gh_icon_fix.js`):

   Add your repository to the `repoMap` so the GitHub icon links to the correct repository:

   ```javascript
   const repoMap = {
       'hed-python/': 'hed-python',
       'hed-schemas/': 'hed-schemas',
       'hed-matlab/': 'hed-matlab',
       'hed-javascript/': 'hed-javascript',
       'hed-mcp/': 'hed-mcp',
       'hed-web/': 'hed-web',
       'hed-vis/': 'hed-vis',
       'ndx-hed/': 'ndx-hed',
       'table-remodeler/': 'table-remodeler',
       'CTagger/': 'CTagger',
       'your-repo/': 'your-repo'  // Add your repository here
   };
   ```

5. **Add search result labels** (`docs/source/_static/search_labels.js`):

   Add your repository to the color configuration and set its sort order:

   ```javascript
   const repoConfig = {
       'hed-python/': {
           label: 'HED Python',
           color: '#b8860b',  // goldenrod
           order: 2
       },
       'table-remodeler/': {
           label: 'Table Remodeler',
           color: '#dc143c',  // crimson
           order: 3
       },
       'your-repo/': {
           label: 'Your Repo',
           color: '#ff6347',  // Choose a distinct color
           order: 4  // Higher numbers appear later in search results
       },
       'default': {
           label: 'HED Resources',
           color: '#0969da',  // blue
           order: 1  // Appears first in search results
       }
   };
   ```

   The `order` field controls the grouping of search results - lower numbers appear first. Results within each repository are sorted by relevance score.

6. **Add to main documentation navigation** (`docs/source/index.rst`):

   Include your submodule in the table of contents:

   ```rst
   .. toctree::
      :maxdepth: 2
      :caption: Tool Documentation:
      
      hed-python/index
      table-remodeler/index
      your-repo/index
   ```

7. **Test the integration**:

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
