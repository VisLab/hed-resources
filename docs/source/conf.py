# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
from datetime import date
from pathlib import Path

from sphinx.util import logging

logger = logging.getLogger(__name__)

sys.path.insert(0, os.path.abspath("../../"))
sys.path.insert(0, os.path.abspath("."))

# -- Submodule documentation integration -------------------------------------
# Add paths for submodule documentation sources

# Define the base submodules directory
submodules_base = Path(__file__).parent.parent.parent / "submodules"

# List of submodules with documentation to integrate
submodule_docs = {
    "hed-python": submodules_base / "hed-python" / "docs",
    "table-remodeler": submodules_base / "table-remodeler" / "docs",
}

# Add submodule source code paths to sys.path for autodoc
submodule_sources = {
    "hed-python": submodules_base / "hed-python",
    "table-remodeler": submodules_base / "table-remodeler",
}

for name, src_path in submodule_sources.items():
    if src_path.exists():
        sys.path.insert(0, str(src_path))
        logger.info(f"Added submodule source path: {name} -> {src_path}")
    else:
        logger.warning(f"Submodule source path not found: {name} -> {src_path}")

# Add submodule doc source directories to path if they exist
for name, doc_path in submodule_docs.items():
    if doc_path.exists():
        sys.path.insert(0, str(doc_path))
        logger.info(f"Added submodule documentation path: {name} -> {doc_path}")
    else:
        logger.warning(f"Submodule documentation path not found: {name} -> {doc_path}")


# -- Project information -----------------------------------------------------

project = "HED resources"
copyright = f"2017-{date.today().year}, HED Working Group"
author = "HED Working Group"

# The full version, including alpha/beta/rc tags
version = "1.0.0"
release = "1.0.0"

currentdir = os.path.abspath(os.path.dirname(__file__))
# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "myst_parser",
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx.ext.autosectionlabel",
    "sphinx.ext.intersphinx",
    "sphinx.ext.coverage",
    "sphinx.ext.mathjax",
    "sphinx.ext.viewcode",
    "sphinx.ext.githubpages",
    "sphinx.ext.napoleon",
    "sphinx_design",
    "sphinx_copybutton",
]

autosummary_generate = True
autodoc_default_options = {"members": True, "inherited-members": True}
add_module_names = False
myst_all_links_external = False
myst_heading_anchors = 4
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "tasklist",
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]
source_suffix = [".rst", ".md"]
master_doc = "index"

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [
    "_build",
    "_templates",
    "Thumbs.db",
    ".DS_Store",
    "*.md.backup",
]


# -- Options for HTML output -------------------------------------------------

# Syntax highlighting style for light mode
pygments_style = "sphinx"
# Syntax highlighting style for dark mode
pygments_dark_style = "monokai"

html_theme = "furo"
html_title = "HED resources"
html_logo = "_static/images/croppedWideLogo.png"

# Furo theme options
html_theme_options = {
    "sidebar_hide_name": False,
    "light_css_variables": {
        "color-brand-primary": "#0969da",
        "color-brand-content": "#0969da",
    },
    "dark_css_variables": {
        "color-brand-primary": "#58a6ff",
        "color-brand-content": "#58a6ff",
    },
    "source_repository": "https://github.com/hed-standard/hed-resources/",
    "source_branch": "main",
    "source_directory": "docs/source/",
}

# Configure sidebar to show logo, search, navigation, and quick links
html_sidebars = {
    "**": [
        "sidebar/brand.html",
        "sidebar/search.html",
        "sidebar/scroll-start.html",
        "sidebar/navigation.html",
        "quicklinks.html",
        "sidebar/ethical-ads.html",
        "sidebar/scroll-end.html",
    ]
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]
html_css_files = ["custom.css"]
html_js_files = ["gh_icon_fix.js", "search_labels.js"]

# Copy redirect HTML pages and custom search page directly to output (no Sphinx)
# These files will be copied as-is to the _build/html directory
html_extra_path = [
    "HedRemodelingQuickstart.html",
    "HedRemodelingTools.html",
    "HedAnnotationInNWB.html",
    "HedOnlineTools.html",
    "HedJavascriptTools.html",
    "CTaggerGuide.html",
    "HedAndEEGLAB.html",
    "HedMatlabTools.html",
]

# -- Intersphinx configuration -----------------------------------------------
# Enable cross-references to external documentation

intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
    "hed-python": ("https://www.hedtags.org/hed-python", None),
}

# -- Submodule static files configuration ------------------------------------
# Add static files from submodules if they exist

for _name, doc_path in submodule_docs.items():
    static_path = doc_path / "_static"
    if static_path.exists():
        # Use absolute path for submodule static files
        html_static_path.append(str(static_path))
