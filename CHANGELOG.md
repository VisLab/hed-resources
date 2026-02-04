# Changelog

All notable changes to the HED Resources documentation project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

______________________________________________________________________

Originally the HED documentation was housed in the [hed-standard/hed-examples](https://github.com/hed-standard/hed-examples), which also contained example HED datasets. The separation of the two repositories was completed on Oct 30, 2025.

This repository originally only housed the overall documentation. However, with the development of the HED AI assistant, it was decided that a unified documentation repository was needed. This release marks the first version of the unified documentation repository. Most of the individual repositories encompassed in this repository have there own documentation housed on GitHub and the documentation is imported under submodules.

______________________________________________________________________

## Release 1.0.0 February 4, 2026

This is the initial release of the unified HED Resources documentation system. Previously, documentation was scattered across multiple repositories. This release consolidates all HED documentation into a single, searchable, and maintainable site with a robust build system.

### Highlights

- **Unified Documentation Build System**: Complete infrastructure for building integrated documentation from multiple HED repositories
- **Submodule Integration**: Seamless integration of documentation from 9 HED repositories into a single documentation site
- **Command-Line Tools**: Two new CLI commands (`hed-build-docs` and `hed-serve-docs`) for building and serving documentation
- **Modern Documentation Theme**: Clean, accessible Furo theme with dark mode support
- **Comprehensive Documentation Coverage**: Tutorials, guides, and tool references for all HED components

### Major changes

#### Unified build system

**Core Build Infrastructure**:

- Created `scripts/build_docs.py` - Main build script that orchestrates documentation copying and Sphinx building
- Implemented automatic submodule documentation copying with path normalization
- Added intelligent index.rst section removal to prevent duplicate sidebar entries
- Integrated cross-repository search functionality across all HED documentation

**Command-Line Interface**:

- Added `hed-build-docs` command for building unified documentation (cross-platform)
- Added `hed-serve-docs` command for local documentation preview (cross-platform)
- Commands installed via pip work on all platforms (Windows, macOS, Linux)

**Build Features**:

- Automatic detection and copying of documentation from submodules
- Support for both Sphinx (.rst) and MyST Markdown (.md) documentation formats
- Intelligent handling of static assets (\_static directories)
- Preservation of submodule-specific configuration files
- Clean build process with automatic cleanup of stale files

#### Integrated submodule documentation

**Successfully integrated documentation from 9 HED repositories**:

1. **hed-python** - Python hedtools package API and user guide
2. **hed-matlab** - MATLAB/EEGLAB integration tools
3. **hed-javascript** - JavaScript validator and web tools
4. **hed-web** - Online tools and web interfaces
5. **hed-schemas** - Schema development and standards
6. **hed-mcp** - Model Context Protocol integration
7. **hed-vis** - Visualization tools and widgets
8. **table-remodeler** - Table remodeling operations
9. **ndx-hed** - Neurodata Without Borders (NWB) integration

**Submodule Management**:

- Added `.gitmodules` configuration for all submodules
- Implemented automatic submodule initialization and updates
- Created documentation mapping for each submodule's docs location
- Added submodule-specific index files for table of contents integration

#### Documentation structure

**Main Documentation Categories**:

- **Introduction & Overview**: `IntroductionToHed.md`, `HowCanYouUseHed.md`, `HedHistory.md`, `HedGovernance.md`
- **Quick-Start Guides**: `HedAnnotationQuickstart.md`, `BidsAnnotationQuickstart.md`, `NWBAnnotationQuickstart.md`
- **Tool Documentation**: Integration guides for Python, MATLAB, JavaScript, and web tools
- **Advanced Topics**: Validation, search, summarization, and remodeling guides
- **Schema Documentation**: Schema structure, versioning, and development guides
- **Reference Materials**: Test datasets, documentation summary, version management

**Documentation Features**:

- MyST Markdown parser for enhanced markdown support
- Sphinx-design for rich UI components
- Sphinx-copybutton for easy code copying
- Sphinxcontrib-bibtex for citations and references
- Cross-reference support between all documentation sections

#### Configuration and project setup

**Project Configuration** (`pyproject.toml`):

- Defined project metadata and version (1.0.0)
- Created `docs` optional dependency group with Sphinx and theme packages
- Created `quality` optional dependency group with linting and checking tools
- Added project scripts for `hed-build-docs` and `hed-serve-docs` commands
- Configured tool settings for Black, Ruff, Codespell, and mdformat

**Dependency Management**:

- **Documentation Dependencies**:

  - sphinx >= 7.1.0, < 8.2.0 (documentation generator)
  - furo >= 2024.1.29 (modern documentation theme)
  - myst-parser >= 3.0.0 (Markdown support)
  - sphinx-design >= 0.6.1 (UI components)
  - sphinx-copybutton >= 0.5.2 (code copy buttons)
  - linkify-it-py >= 2.0.3 (URL linkification)
  - sphinxcontrib-bibtex >= 2.6.0 (citations)

- **Quality Tools**:

  - linkchecker >= 10.0.0 (link validation)
  - codespell >= 2.0.0 (spell checking)
  - ruff >= 0.0.284 (Python linting)
  - black >= 23.0.0 (code formatting)
  - mdformat >= 0.7.0 with myst support (Markdown formatting)
  - pre-commit >= 3.0.0 (Git hooks)

**Sphinx Configuration** (`docs/source/conf.py`):

- Project metadata and version settings
- Furo theme configuration with custom styling
- MyST parser extensions and settings
- HTML output customization
- Static path configuration for assets
- Template directory setup

#### GitHub actions and CI/CD

**Documentation Deployment**:

- Created `docs.yml` workflow for automatic documentation building and deployment
- Configured GitHub Pages deployment on push to main branch
- Added artifact handling for built documentation
- Integrated submodule checkout and initialization

**Quality Assurance Workflows**:

- `codespell.yaml` - Automatic spell checking on push and pull requests
- Link checking workflows (to be configured with lychee)
- Markdown formatting validation
- Documentation build validation on pull requests

#### Developer experience

**Development Setup**:

- Simple installation: `pip install -e .[docs,quality]`
- Clear documentation in README.md with setup instructions
- Comprehensive development guide in `.github/copilot-instructions.md`
- Platform-specific scripts for Windows (PowerShell) and Unix environments

**Documentation Workflows**:

- Local build and preview: `hed-build-docs` followed by `hed-serve-docs`
- Automatic browser opening at http://localhost:8000
- Fast rebuild times with Sphinx incremental builds
- Clear error messages and build status reporting

**Development Tools**:

- Created `scripts/README.md` with detailed usage documentation
- Added `.lycheeignore` for link checker exclusions
- Configured `lychee.toml` for link validation settings
- Set up code quality tool configurations

### Documentation content

**Comprehensive User Guides**:

- Complete introduction to HED system and concepts
- Quick-start tutorials for BIDS and NWB annotation
- Tool-specific guides for Python, MATLAB, and JavaScript
- Integration guides for EEGLAB and NWB
- Advanced topics: validation, search, summarization, remodeling

**Schema Documentation**:

- HED schema structure and organization
- Version management and understanding HED versions
- Schema development guide for contributors
- Standard and library schema documentation

**Reference Documentation**:

- HED test datasets and examples
- Complete documentation summary and index
- Historical context and project governance
- What's new and recent developments

### File organization and structure

**Repository Structure**:

```
hed-resources/
├── docs/
│   ├── source/              # Main documentation source
│   ├── _build/              # Built HTML output
│   ├── deprecated/          # Archived documentation
│   └── build_unified.py     # Legacy build script
├── scripts/
│   ├── build_docs.py        # Main build script
│   ├── serve_docs.py        # Development server
│   └── README.md            # Script documentation
├── submodules/              # Git submodules for HED repos
│   ├── hed-python/
│   ├── hed-matlab/
│   ├── hed-javascript/
│   └── ... (9 submodules total)
├── pyproject.toml           # Project configuration
├── README.md                # Repository overview
├── CHANGELOG.md             # This file
└── LICENSE                  # MIT License
```

**Documentation Source Structure**:

- Root documentation files in `docs/source/`
- Submodule documentation copied to `docs/source/{submodule-name}/`
- Static assets in `docs/source/_static/`
- Templates in `docs/source/_templates/`
- Index file `docs/source/index.rst` with complete table of contents

### Code quality and formatting

**Formatting Standards**:

- Black code formatter for Python scripts (line length: 88)
- mdformat for consistent Markdown styling
- Configured exclusion patterns for submodules and build artifacts
- Pre-commit hooks for automated formatting

**Linting and Quality**:

- Ruff for Python linting with comprehensive rule set
- Codespell for spell checking across all documentation
- Link checking with lychee for external and internal links
- GitHub Actions integration for automated quality checks

### Platform support

**Python Version Requirements**:

- Minimum: Python 3.10
- Tested on: Python 3.10, 3.11, 3.12, 3.13, 3.14
- Full support for modern type hints and language features

**Operating System Support**:

- Windows (PowerShell and Command Prompt)
- macOS (Bash)
- Linux (Bash)
- Platform-specific build scripts provided

### Bug fixes and minor improvements

**Build System**:

- Fixed path handling for cross-platform compatibility
- Improved error messages for missing submodules
- Enhanced logging for build process debugging
- Fixed static asset copying from submodules

**Documentation**:

- Corrected cross-reference links between sections
- Fixed anchor definitions for internal linking
- Updated external links to current HED resources
- Improved code block syntax highlighting

**Configuration**:

- Fixed Sphinx warnings about duplicate labels
- Corrected theme configuration for dark mode
- Enhanced search functionality configuration
- Fixed static path handling

### Breaking changes

This is the first release, so there are no breaking changes from previous versions. However, note:

- Documentation URLs have changed from scattered locations to centralized at `hedtags.org/hed-resources`
- Build process requires Python 3.10+ (modern environment needed)
- Old repository-specific documentation builds are deprecated in favor of unified build

### Migration guide

**For Documentation Contributors**:

**Old workflow** (editing in individual repositories):

```bash
# Edit documentation in hed-python
cd hed-python/docs
make html
```

**New workflow** (unified documentation):

```bash
# Edit documentation in submodule
cd hed-resources/submodules/hed-python/docs
# Make changes, commit to submodule

# Update hed-resources to use new submodule commit
cd hed-resources
git add submodules/hed-python
git commit -m "Update hed-python submodule"

# Build unified documentation
hed-build-docs

# Preview locally
hed-serve-docs
```

**For Documentation Readers**:

- All documentation now available at: https://www.hedtags.org/hed-resources
- Unified search across all HED documentation
- Cross-references work between all documentation sections
- Single table of contents for easy navigation

**For Tool Users**:

- Tool-specific documentation remains in their respective sections
- API documentation is now searchable across all tools
- Examples and tutorials are easier to find and navigate
- All documentation follows consistent formatting and style

### Known issues

- Submodule documentation must be manually updated when submodules change (future: automation)
- Some external links may need updating to reflect new documentation structure
- Build process requires all submodules to be initialized (working on optional submodules)

### Future improvements

- Automated submodule documentation updates in CI/CD
- Version-specific documentation (documentation for different releases)
- Enhanced search with faceted filtering by tool/repository
- PDF export of complete documentation
- Internationalization support for non-English documentation

### Acknowledgments

This unified documentation system was developed by the HED Working Group with contributions from multiple repositories and community members. Special thanks to all HED tool developers and documentation contributors who made this consolidation possible.

______________________________________________________________________

For more information about HED, visit:

- **Homepage**: https://www.hedtags.org
- **Documentation**: https://www.hedtags.org/hed-resources
- **Specification**: https://www.hedtags.org/hed-specification
- **GitHub**: https://github.com/hed-standard/hed-resources
