# HED-Resources Documentation Instructions

> **Local environment**: If a `.status/local-environment.md` file exists in this repository,
> read it before proceeding — it contains platform-specific setup details (OS, shell, virtual
> environment activation) that override the generic instructions here.

When you create summaries of what you did, put them in the `.status/` directory at the repo root (this directory is gitignored).

## Project Overview
HED (Hierarchical Event Descriptors) is a framework for systematically describing events and experimental metadata. This repository (`hed-resources`) provides the **primary documentation and user resources** for the HED system. The documentation is built using Sphinx and MyST parser, covering comprehensive guides, tutorials, and tool references.

### Related Repositories
- **[hed-python](https://github.com/hed-standard/hed-python)**: Python implementation of HED tools (hedtools package)
- **[hed-schemas](https://github.com/hed-standard/hed-schemas)**: Standardized vocabularies (HED schemas) in XML/MediaWiki/OWL formats
- **[hed-specification](https://github.com/hed-standard/hed-specification)**: Formal specification defining HED annotation rules
- **[hed-examples](https://github.com/hed-standard/hed-examples)**: Example datasets and use cases
- **[hed-matlab](https://github.com/hed-standard/hed-matlab)**: MATLAB/EEGLAB implementation
- **[hed-javascript](https://github.com/hed-standard/hed-javascript)**: JavaScript/web tools implementation

### Documentation Distribution
- **Published Docs**: [hedtags.org](https://www.hedtags.org/hed-resources)
- **Python Version**: 3.10+ required (for building docs)
- **Format**: Sphinx documentation with MyST Markdown


## Documentation Structure & Organization

### Main Documentation Categories
The documentation is organized into several categories located in `docs/source/`:

1. **Introduction & Overview**:
   - `IntroductionToHed.md`: Core HED concepts and system overview
   - `HowCanYouUseHed.md`: Use cases and applications
   - `HedHistory.md`: Historical context and evolution
   - `HedGovernance.md`: Project governance structure
   - `WhatsNew.md`: Latest updates and changes

2. **Getting Started Guides**:
   - `HedAnnotationQuickstart.md`: Quick introduction to HED annotation
   - `BidsAnnotationQuickstart.md`: HED annotation in BIDS context
   - `HedRemodelingQuickstart.md`: Table remodeling introduction

3. **Tool Documentation**:
   - `HedPythonTools.md`: Python hedtools package documentation
   - `HedMatlabTools.md`: MATLAB/EEGLAB integration
   - `HedJavascriptTools.md`: JavaScript tools and web integration
   - `HedOnlineTools.md`: Web-based validation and transformation tools
   - `CTaggerGuide.md`: Community tagging tool

4. **Integration Guides**:
   - `HedAndEEGLAB.md`: EEGLAB plugin integration
   - `HedAnnotationInNWB.md`: Neurodata Without Borders integration

5. **Advanced Topics**:
   - `HedValidationGuide.md`: Validation processes and error handling
   - `HedSearchGuide.md`: Searching and querying HED annotations
   - `HedSummaryGuide.md`: Summary generation and analysis
   - `HedRemodelingTools.md`: Comprehensive remodeling operations
   - `HedConditionsAndDesignMatrices.md`: Experimental design extraction
   - `HedAnnotationSemantics.md`: Semantic annotation principles

6. **Schema & Standards**:
   - `HedSchemas.md`: Schema structure and versions
   - `UnderstandingHedVersions.md`: Version management
   - `HedSchemaDevelopersGuide.md`: Creating and modifying schemas

7. **Reference & Resources**:
   - `HedTestDatasets.md`: Test datasets and examples
   - `DocumentationSummary.md`: Documentation index
   - `HEDSubmissionToINCF.md`: INCF submission details

### Documentation Building Process

**Sphinx + MyST Configuration**:
- Configuration file: `docs/source/conf.py`
- MyST parser enables Markdown support with Sphinx directives
- Extensions: sphinx-design, sphinx-copybutton, sphinxcontrib-mermaid
- Theme: sphinx-book-theme

**Build Commands**:
```shell
# Build unified documentation (after pip install -e .[docs])
hed-build-docs
# Or: python scripts/build_docs.py

# Serve documentation locally for preview
hed-serve-docs
# Or: python scripts/serve_docs.py

# Check for broken links
sphinx-build -b linkcheck docs/source docs/_build/linkcheck
```


## Documentation Writing Guidelines

### MyST Markdown Conventions

**Headers and Anchors**:
```markdown
(anchor-name-anchor)=
## Section Title

Reference sections using: [Link text](anchor-name-anchor)
```

**Admonitions** (notes, tips, warnings):
```markdown
```{admonition} Title
---
class: tip
---
Content here
```​
```

**Code Blocks with Syntax Highlighting**:
```markdown
```python
# Python code example
from hed import HedString
```​

```json
{
  "operation": "rename_columns"
}
```​
```

**Tables**:
```markdown
```{table} Table caption
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```​
```

**Images**:
```markdown
![Alt text](path/to/image.png)
# Or for Sphinx-controlled images:
![Alt text](./_static/images/diagram.png)
```

**Cross-References**:
- Internal links: `[Text](./OtherDocument.md#section-anchor)`
- External links: `[Text](https://example.com)`
- Tool references: `[**HED Online Tools**](https://hedtools.org)`

### Content Style Guidelines

1. **Voice and Tone**:
   - Use clear, direct language
   - Prefer active voice
   - Address readers as "you" when appropriate
   - Use present tense for instructions

2. **Technical Accuracy**:
   - Verify all code examples work with current HED versions
   - Reference specific schema versions when relevant
   - Include complete, runnable examples
   - Test command-line examples before documenting

3. **Structure**:
   - Start with high-level concepts before details
   - Use progressive disclosure (simple → complex)
   - Include "What you'll learn" sections for tutorials
   - Provide working examples before edge cases

4. **Linking Strategy**:
   - Link to related documentation sections
   - Reference tool implementations (Python, MATLAB, JavaScript)
   - Link to external resources (BIDS, NWB standards)
   - Include GitHub repository links when relevant

### Static Assets

**Location**: `docs/source/_static/`
- `images/`: Screenshots, diagrams, illustrations
- `data/`: Example datasets, sample files
- `custom.css`: Custom styling

**Image Guidelines**:
- Use PNG for screenshots and diagrams
- Use SVG for vector graphics when possible
- Optimize file sizes (compress images)
- Use descriptive filenames: `remodeling-workflow.png` not `image1.png`
- Include alt text for accessibility

## Development Workflows

### Documentation Development Setup

**Initial Setup**:
```shell
# Clone repository (with submodules)
git clone --recurse-submodules https://github.com/hed-standard/hed-resources.git
cd hed-resources

# Create and activate virtual environment (see .status/local-environment.md for activation syntax)
python -m venv .venv

# Install in development mode with all dependencies
pip install -e ".[docs,quality]"
```

**Update submodules** (required before building — documentation pulls content from submodules):
```shell
git submodule update --init --recursive --remote --merge
```

**Regular Development**:
```shell
# Build documentation
hed-build-docs

# Serve locally to preview changes
hed-serve-docs
# Then open http://localhost:8000 in browser
```

### Quality Assurance

**CI workflows** (run on push/PR to `main`) — always replicate locally before submitting:

| Workflow | What it checks | Local replication command |
|---|---|---|
| `codespell.yaml` | Spelling | `uvx --with tomli codespell . --skip="pyproject.toml,lychee.toml,./docs/deprecated/HEDSubmissionToINCF.md"` |
| `mdformat.yaml` | Markdown formatting | `uvx --with mdformat-myst mdformat --check --wrap no --number docs/source/*.md *.md` |
| `ruff.yaml` | Python style/lint | `uvx ruff check . && uvx ruff format --check .` |
| `links.yaml` | External links (weekly) | `sphinx-build -b linkcheck docs/source docs/_build/linkcheck` |
| `deploy-docs.yaml` | Docs build | `hed-build-docs` |

> **Note**: CI uses `uvx` (no install needed). Locally you can use the same `uvx` commands or the installed tools after `pip install -e ".[docs,quality]"`.

**Spell Checking** (local):
```shell
codespell docs/source/*.md
```

**Markdown Formatting** (local — see `.status/local-environment.md` for platform-specific glob syntax):
```shell
# Linux/macOS
mdformat --check --wrap no --number docs/source/*.md *.md
```


### CI/CD and Publishing

**GitHub Actions** (`.github/workflows/`):
- `deploy-docs.yaml`: Builds and publishes documentation to GitHub Pages (push to `main`)
- `codespell.yaml`: Spell checking on push/PR to `main`
- `mdformat.yaml`: Markdown format check on push/PR to `main`
- `ruff.yaml`: Python lint/format check on push/PR to `main`
- `links.yaml`: Lychee external link checker (weekly scheduled)

**Publishing Process**:
1. Documentation is automatically built on push to `main` branch
2. Built HTML is published to GitHub Pages
3. Available at [hedtags.org/hed-resources](https://www.hedtags.org/hed-resources)
4. Manual builds for testing: `hed-build-docs`

## Common Documentation Tasks

### Adding a New Documentation Page

1. **Create the Markdown file** in `docs/source/`:
```shell
# Create new file (use your editor or platform-appropriate command)
touch docs/source/NewGuideName.md   # Linux/macOS
```

2. **Add to table of contents** in `docs/source/index.rst`:
```rst
.. toctree::
   :maxdepth: 2
   
   NewGuideName
```

3. **Build and verify**:
```shell
hed-build-docs
# Check docs/_build/html/NewGuideName.html
```

### Updating Existing Documentation

1. **Edit the Markdown file** directly in `docs/source/`
2. **Rebuild documentation** to see changes:
```shell
sphinx-build -b html docs/source docs/_build/html
```
3. **Verify links and formatting**:
```shell
# Check for broken links
sphinx-build -b linkcheck docs/source docs/_build/linkcheck
```

### Working with Code Examples

**Include downloadable data files**:
```markdown
Download: [example_file.tsv](./_static/data/example_file.tsv)
```

**Inline code with proper highlighting**:
- Use triple backticks with language identifier
- Supported: python, json, bash, powershell, matlab, javascript
- Use `text` or `console` for terminal output

### Organizing Images and Diagrams

**Workflow diagrams**: Store in `docs/source/_static/images/`
```markdown
![Workflow diagram](./_static/images/workflow-diagram.png)
```

**Screenshots**: Crop to relevant area, highlight important UI elements

**Naming convention**: Use descriptive kebab-case names
- Good: `remodeling-process-diagram.png`
- Bad: `img1.png`, `screenshot.png`

### Handling Documentation Migration and Redirects

When documentation is moved to a different site (e.g., from `hedtags.org/hed-resources` to `hedtags.org/new-site`), use the redirect system to maintain old URLs and handle anchor remapping.

**Redirect System Components**:
- `docs/source/_static/redirect-config.js`: Central configuration for all redirects
- `docs/source/_static/redirect.js`: Universal redirect script
- `docs/source/_templates/redirect-page-template.html`: Template for creating shim pages
- `docs/source/_static/REDIRECT_SYSTEM.md`: Complete documentation on the redirect system

**When to Use**:
- Moving entire sections to new sites
- Renaming pages with external links
- Restructuring documentation with changed anchor names
- Maintaining backward compatibility for bookmarks and search engine results

**Quick Process**:
1. Add page configuration to `redirect-config.js`
2. Copy and customize `redirect-page-template.html`
3. Remove page from `index.rst` navigation
4. Test locally before deploying

See `docs/source/_static/REDIRECT_SYSTEM.md` for detailed instructions.

## Repository Structure & Files

### Key Configuration Files

- `pyproject.toml`: Project metadata and dependency specifications
  - `[project.optional-dependencies]` defines docs and quality groups
- `docs/source/conf.py`: Sphinx configuration
  - Extensions, theme, MyST settings
- `.codespellrc`: Spell checker configuration
- `lychee.toml`: Link checker configuration
- `.lycheeignore`: URLs to exclude from link checking

### Directory Structure

```
hed-resources/
├── docs/
│   ├── source/           # Documentation source (Markdown files)
│   │   ├── *.md         # Individual documentation pages
│   │   ├── index.rst    # Main table of contents
│   │   ├── conf.py      # Sphinx configuration
│   │   ├── _static/     # Images, CSS, downloadable files
│   │   └── _templates/  # Custom HTML templates
│   ├── _build/          # Generated HTML (gitignored)
│   │   └── html/        # Built documentation
│   └── build_unified.py # Documentation build script
├── submodules/          # Git submodules (hed-python, hed-schemas, etc.)
├── .github/
│   ├── workflows/       # CI/CD automation
│   └── copilot-instructions.md  # This file
├── .status/            # Status summaries (gitignored)
├── scripts/            # Build and utility scripts
│   ├── build_docs.py   # Main build script
│   └── serve_docs.py   # Documentation server
├── pyproject.toml     # Project configuration
└── README.md          # Repository overview
```

## Dependencies & Environment

### Required Dependencies (docs group)
- **sphinx**: Documentation generator (>=7.1.0)
- **furo**: Modern documentation theme
- **myst-parser**: Markdown support in Sphinx
- **sphinx-design**: Enhanced UI components
- **sphinx-copybutton**: Copy button for code blocks
- **linkify-it-py**: URL linkification
- **sphinxcontrib-bibtex**: Citations and references

### Quality Tools (quality group)
- **linkchecker**: Validate external/internal links
- **codespell**: Spell checking
- **ruff**: Python linting (if needed for scripts)
- **black**: Code formatting (if needed for scripts)
- **mdformat**: Markdown formatting

### Python Version
- **Required**: Python 3.10 or higher
- **Tested on**: 3.10, 3.11, 3.12, 3.13
- **Reason**: Modern type hints and Sphinx compatibility

## Common Pitfalls to Avoid

### Documentation-Specific Issues
- **Don't hardcode absolute paths** - Use relative paths for images/links
- **Don't skip anchor definitions** - Every section should have an anchor for linking
- **Don't use HTML directly** unless necessary - Use MyST Markdown directives
- **Don't forget to rebuild** after changes - Changes won't appear until rebuild
- **Don't commit build artifacts** - `docs/_build/` is gitignored
- **Don't use inconsistent heading levels** - Follow H1 → H2 → H3 hierarchy

### Cross-Reference Issues
- **Do use MyST anchors** for internal references: `(anchor-name-anchor)=`
- **Do test all links** before committing using linkcheck
- **Do reference related sections** to help readers navigate
- **Don't use bare URLs** - Always use proper Markdown links with descriptive text

### Code Example Issues  
- **Do test all code examples** in the actual environments (Python, MATLAB, etc.)
- **Do specify language** in code blocks for proper syntax highlighting
- **Do include complete examples** that readers can run
- **Don't assume reader context** - Provide necessary imports/setup

### Build Issues
- **Always activate `.venv`** before running any commands — see `.status/local-environment.md` for activation syntax
- **Use cross-platform commands** — `hed-build-docs` and `hed-serve-docs` work on all platforms
- **Shell glob expansion** — `docs/source/*.md` works on Linux/macOS; see `.status/local-environment.md` for Windows workarounds
- **Watch for line endings** — Git should handle CRLF/LF automatically

## Tips for Effective Documentation

### Before Starting
1. Review related documentation to maintain consistency
2. Identify your target audience (beginners vs. advanced users)
3. Determine what examples/data files you'll need
4. Outline the structure before writing

### While Writing
1. Start with a clear introduction and learning objectives
2. Use progressive disclosure (simple concepts first)
3. Include practical examples at every step
4. Add cross-references to related topics
5. Use admonitions (tips, warnings) to highlight important points

### After Writing
1. Build documentation and review in browser
2. Test all code examples
3. Check all links (internal and external)
4. Run spell checker
5. Get peer review if possible
6. Update the DocumentationSummary.md if adding major sections

## References to Other HED Resources

When documenting HED features, reference the source of truth:
- **Schema details**: Link to hed-schemas repository
- **Validation rules**: Reference hed-specification
- **Tool implementation**: Link to hed-python, hed-matlab, or hed-javascript
- **Examples**: Reference hed-examples repository
- **Online tools**: Link to hedtools.org with specific tool pages
