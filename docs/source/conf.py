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
import importlib.util
import logging as std_logging
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
    "hed-vis": submodules_base / "hed-vis" / "docs",
    "hed-mcp": submodules_base / "hed-mcp",
    "hed-javascript": submodules_base / "hed-javascript",
    "hed-matlab": submodules_base / "hed-matlab" / "docs",
    "ndx-hed": submodules_base / "ndx-hed" / "docs" / "source",
    "hed-schemas": submodules_base / "hed-schemas" / "docs",
    "hed-server": submodules_base / "hed-server" / "docs",
    "CTagger": submodules_base / "CTagger" / "docs",
    "hed-specification": submodules_base / "hed-specification" / "docs" / "source",
    "hed-tests": submodules_base / "hed-tests" / "docs",
}

# Add submodule source code paths to sys.path for autodoc
submodule_sources = {
    "hed-python": submodules_base / "hed-python",
    "table-remodeler": submodules_base / "table-remodeler",
    "hed-vis": submodules_base / "hed-vis",
    "hed-mcp": submodules_base / "hed-mcp",
    "hed-javascript": submodules_base / "hed-javascript",
    "hed-matlab": submodules_base / "hed-matlab",
    "ndx-hed": submodules_base / "ndx-hed" / "src",
    "hed-schemas": submodules_base / "hed-schemas",
    "hed-server": submodules_base / "hed-server",
    "CTagger": submodules_base / "CTagger",
    "hed-specification": submodules_base / "hed-specification",
    "hed-tests": submodules_base / "hed-tests",
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

# Mock imports for packages not available in the docs build environment
autodoc_mock_imports = [
    "flask",
    "werkzeug",
    "ndx_hed",
]

autosectionlabel_prefix_document = True

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
    # hed-task's index.md writes {{ n_tasks }} and friends; see
    # _hed_task_counts() below for where the values come from.
    "substitution",
    "tasklist",
]


# -- Live counts for the hed-task catalog pages -------------------------------
#
# hed-task's narrative pages write {{ n_tasks }} and friends, and hed-task's own
# conf.py defines them in myst_substitutions, computed from its data/ files. We
# execute that conf.py and reuse its result rather than recomputing the counts.
#
# Recomputing was tried first and drifted on the very next upstream update:
# hed-task added n_pseudo_tasks and redefined n_tasks to exclude pseudo tasks,
# which would have silently published 106 where the catalog says 103. Its conf.py
# is plain data loading - stdlib imports and module-level assignments, no side
# effects - so executing it is cheap and keeps one definition of the numbers.
#
# The submodule may not be checked out (build_unified.py warns and skips in that
# case), so any failure leaves the substitutions unset rather than breaking the
# build. Pages then warn once per unresolved substitution, which is the visible
# symptom we want.


def _hed_task_counts() -> dict[str, str]:
    conf_path = submodules_base / "hed-task" / "docs" / "source" / "conf.py"
    try:
        spec = importlib.util.spec_from_file_location("hed_task_conf", conf_path)
        if spec is None or spec.loader is None:
            raise ImportError(f"cannot load {conf_path}")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        substitutions = module.myst_substitutions
    except Exception as err:  # noqa: BLE001 - never fail the whole docs build
        logger.warning("hed-task counts unavailable, substitutions left unset: %s", err)
        return {}

    return {str(key): str(value) for key, value in substitutions.items()}


myst_substitutions = _hed_task_counts()

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
    # Copied from hed-task; include fragments, not documents of their own.
    "hed-task/_generated",
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
#
# This repo's own "_static" is deliberately not listed here. Submodule static
# directories are appended below and then "_static" last, because Sphinx copies
# html_static_path entries in order and later ones overwrite earlier ones by
# filename. See the comment on that loop.
html_static_path = []
html_css_files = ["custom.css"]
html_js_files = ["gh_icon_fix.js", "search_labels.js", "fix_sidebar_scroll.js"]

# -- Redirect shims for pages that moved to other sites ----------------------
#
# These are standalone HTML pages copied verbatim into the build, each one a
# meta-refresh bounce to wherever the page now lives. They keep old published
# URLs working: without them https://www.hedtags.org/hed-resources/<name>.html
# is a hard 404.
#
# They were lost on 2026-02-01 in 455e464 ("Updated the submodules"), which also
# deleted this block, and all seven URLs 404ed until restored on 2026-09-20.
#
# Each shim redirects in two layers. A <meta http-equiv="refresh"> fires at 3s
# and needs no JavaScript, so the page is never wholly broken. Before that,
# _static/redirect-config.js and _static/redirect.js redirect at 100ms and
# translate the URL fragment through that page's anchorMap, so a deep bookmark
# lands on the matching section of the new page instead of its top. Do not drop
# the script tags: the fragment handling is the reason they are there.
#
# To add one: copy docs/source/_templates/redirect-page-template.html to
# docs/source/<OldPageName>.html, work through its TODO comments, add an entry
# to _static/redirect-config.js, and add the filename below. Every entry here
# must name a file that exists, or the build fails.

html_extra_path = [
    "CTaggerGuide.html",
    "HedAndEEGLAB.html",
    "HedAnnotationInNWB.html",
    "HedJavascriptTools.html",
    "HedMatlabTools.html",
    "HedOnlineTools.html",
    "HedSchemaDevelopersGuide.html",
]

# -- Intersphinx configuration -----------------------------------------------
# Enable cross-references to external documentation

intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
    "hed-python": ("https://www.hedtags.org/hed-python", None),
}

# -- Submodule static files configuration ------------------------------------
#
# Submodule static directories are copied first, then this repo's own "_static"
# last. Order matters: Sphinx flattens every html_static_path entry into a
# single output _static/ directory, and a later entry silently overwrites an
# earlier file of the same name.
#
# Nearly every submodule ships its own custom.css and gh_icon_fix.js under those
# exact names. With "_static" listed first, the site's own stylesheet lost to
# whichever submodule happened to be last in submodule_docs (hed-tests), so the
# published custom.css was hed-tests' 10035-byte copy rather than this repo's
# 11096-byte one - dropping, among other things, the quicklinks and RST sidebar
# styling and the html[data-theme="dark"] rules. Keeping "_static" last means
# submodules still contribute files this repo does not have (images, ndx-hed's
# theme_overrides.css) while the site's own versions win every collision.

for _name, doc_path in submodule_docs.items():
    static_path = doc_path / "_static"
    if static_path.exists():
        # Use absolute path for submodule static files
        html_static_path.append(str(static_path))

html_static_path.append("_static")


# -- Quieten hed-task's false-positive cross-reference warnings ---------------
#
# hed-task's process pages use MyST labels -- (hed-xxx)= -- as anchor targets for
# deep links from the task and atlas pages. They render correctly (the built page
# carries <span id="hed-xxx">, and the links resolve in a browser), but MyST's link
# validator only recognises myst_heading_anchors slugs as local ids, so it reports
# myst.xref_missing for every one of them: about 1450 warnings out of a 1700-warning
# build. hed-task's own conf.py drops them wholesale with
# suppress_warnings = ["myst.xref_missing"] (submodules/hed-task/docs/source/conf.py).
# We cannot do that here, because the rest of this site raises ~64 xref_missing
# warnings of its own that are worth seeing. So this filter drops only the ones
# whose location is inside hed-task/.


class _HedTaskXrefFilter(std_logging.Filter):
    """Drop myst.xref_missing warnings originating in the hed-task submodule docs."""

    def filter(self, record: std_logging.LogRecord) -> bool:
        if getattr(record, "type", None) != "myst":
            return True
        if getattr(record, "subtype", None) != "xref_missing":
            return True
        location = getattr(record, "location", None)
        where = str(location) if location else record.getMessage()
        return "hed-task" not in where.replace("\\", "/")


def setup(app):
    """Attach the hed-task warning filter to Sphinx's log handlers."""
    log_filter = _HedTaskXrefFilter()
    sphinx_logger = std_logging.getLogger("sphinx")
    sphinx_logger.addFilter(log_filter)
    for handler in sphinx_logger.handlers:
        handler.addFilter(log_filter)
    return {"parallel_read_safe": True, "parallel_write_safe": True}
