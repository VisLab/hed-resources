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

sys.path.insert(0, os.path.abspath("../../"))
sys.path.insert(0, os.path.abspath("."))


# -- Project information -----------------------------------------------------

project = "HED Resources"
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
    "sphinxcontrib.mermaid",
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
    "substitution",
    "tasklist",
    "attrs_inline",
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

html_theme = "sphinx_book_theme"
html_title = "HED Resources"
html_logo = "_static/images/croppedWideLogo.png"

# Theme options for sphinx-book-theme
html_theme_options = {
    "repository_url": "https://github.com/hed-standard/hed-resources",
    "use_repository_button": True,
    "use_issues_button": True,
    "use_edit_page_button": True,
    "path_to_docs": "docs/source",
    "show_toc_level": 2,
    "navigation_with_keys": False,
    "show_navbar_depth": 1,
    "use_download_button": True,
    "toc_title": None,
    "use_fullscreen_button": False,
}

# Force the sidebar to use toctree titles instead of page titles
html_sidebars = {
    "**": [
        "navbar-logo",
        "sidebar-title.html",
        "search-field",
        "sbt-sidebar-nav.html",
        "quicklinks.html",
    ]
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]
html_css_files = ["custom.css"]

# Copy redirect HTML pages directly to output without processing by Sphinx
# These files will be copied as-is to the _build/html directory
html_extra_path = [
    "HedRemodelingQuickstart.html",
    "HedRemodelingTools.html",
    "HedPythonTools.html",
    "HedAnnotationInNWB.html",
    "HedOnlineTools.html",
    "HedJavascriptTools.html",
]
