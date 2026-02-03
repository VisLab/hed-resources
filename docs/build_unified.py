#!/usr/bin/env python3
"""
Build script for unified HED documentation.

This script copies documentation from submodules into the source tree
before building with Sphinx, enabling a unified documentation site with
integrated search across all HED repositories.
"""

import shutil
import sys
from pathlib import Path


def remove_indices_section(index_file):
    """Remove 'Indices and tables' or 'Index' section from an index.rst file.

    This prevents duplicate index entries in the sidebar when integrating
    submodule documentation into the unified docs.
    """
    content = index_file.read_text(encoding="utf-8")

    # Find and remove the "Indices and tables" or "Index" section
    lines = content.split("\n")
    filtered_lines = []
    skip_section = False

    for i, line in enumerate(lines):
        # Check for both "Indices and tables" and "Index" headers
        if line.strip() in ("Indices and tables", "Index"):
            # Check if next line is the RST underline
            if i + 1 < len(lines) and set(lines[i + 1].strip()) in ({"="}, {"-"}):
                skip_section = True
                continue

        if skip_section:
            # Skip until we reach the end of file or another major section
            if line.strip() == "":
                continue
            elif line.strip().startswith("*") or line.strip().startswith(":ref:"):
                # Skip bullet list items and ref links in the indices section
                continue
            elif i + 1 < len(lines) and set(lines[i + 1].strip()) == {"="}:
                # Found a new major section header, stop skipping
                skip_section = False
            else:
                continue

        if not skip_section:
            filtered_lines.append(line)

    # Remove trailing blank lines
    while filtered_lines and not filtered_lines[-1].strip():
        filtered_lines.pop()

    index_file.write_text("\n".join(filtered_lines) + "\n", encoding="utf-8")
    print(f"      Removed index section from {index_file.name}")


def copy_submodule_docs():
    """Copy documentation from submodules into the source tree."""

    # Define source and destination paths
    repo_root = Path(__file__).parent.parent
    source_dir = repo_root / "docs" / "source"
    submodules_dir = repo_root / "submodules"
    index_templates_dir = repo_root / "docs" / "submodule-indexes"

    # Define submodules to include
    submodules = {
        "hed-python": {
            "source": submodules_dir / "hed-python" / "docs",
            "dest": source_dir / "hed-python",
            "files": ["index.rst", "overview.md", "user_guide.md", "api/"],
        },
        "table-remodeler": {
            "source": submodules_dir / "table-remodeler" / "docs",
            "dest": source_dir / "table-remodeler",
            "files": [
                "index.rst",
                "introduction.md",
                "quickstart.md",
                "user_guide.md",
                "custom_operations.md",
                "operations/",
                "api/",
            ],
        },
        "hed-vis": {
            "source": submodules_dir / "hed-vis" / "docs",
            "dest": source_dir / "hed-vis",
            "files": [
                "index.rst",
                "overview.md",
                "user_guide.md",
                "api/",
            ],
        },
        "hed-mcp": {
            "source": submodules_dir / "hed-mcp",
            "dest": source_dir / "hed-mcp",
            "files": ["README.md", "EXAMPLES.md", "API.md"],
            "index_template": "hed-mcp-index.rst",
        },
        "hed-javascript": {
            "source": submodules_dir / "hed-javascript",
            "dest": source_dir / "hed-javascript",
            "files": ["README.md"],
            "index_template": "hed-javascript-index.rst",
        },
        "hed-matlab": {
            "source": submodules_dir / "hed-matlab" / "docs",
            "dest": source_dir / "hed-matlab",
            "files": [
                "index.rst",
                "overview.md",
                "user_guide.md",
                "development.md",
                "api2.rst",
            ],
        },
        "ndx-hed": {
            "source": submodules_dir / "ndx-hed" / "docs" / "source",
            "dest": source_dir / "ndx-hed",
            "files": [
                "index.rst",
                "description.rst",
                "format.rst",
                "release_notes.rst",
                "credits.rst",
                "api.rst",
            ],
        },
        "hed-schemas": {
            "source": submodules_dir / "hed-schemas" / "docs" / "source",
            "dest": source_dir / "hed-schemas",
            "files": [
                "index.rst",
                "introduction.md",
                "user_guide.md",
                "developer_guide.md",
                "contributing.md",
                "schemas_reference.md",
                "api2.rst",
            ],
        },
        "hed-web": {
            "source": submodules_dir / "hed-web" / "docs",
            "dest": source_dir / "hed-web",
            "files": [
                "index.rst",
                "introduction.md",
                "installation.md",
                "user_guide.md",
                "api/",
            ],
        },
        "CTagger": {
            "source": submodules_dir / "CTagger" / "docs",
            "dest": source_dir / "CTagger",
            "files": [
                "index.rst",
                "introduction.md",
                "user_guide.md",
                "ctagger_in_eeglab.md",
            ],
        },
    }

    print("Copying submodule documentation into source tree...")

    for name, config in submodules.items():
        source_path = config["source"]
        dest_path = config["dest"]

        if not source_path.exists():
            print(f"Warning: Submodule {name} not found at {source_path}")
            print("Run: git submodule update --init --recursive")
            continue

        # Remove existing destination if it exists
        if dest_path.exists():
            print(f"  Removing existing: {dest_path.relative_to(repo_root)}")
            shutil.rmtree(dest_path)

        # Create destination directory
        dest_path.mkdir(parents=True, exist_ok=True)
        src_rel = source_path.relative_to(repo_root)
        dest_rel = dest_path.relative_to(repo_root)
        print(f"  Copying {name}: {src_rel} -> {dest_rel}")

        # Copy specified files/directories
        for file_or_dir in config["files"]:
            src_item = source_path / file_or_dir

            if not src_item.exists():
                print(f"    Warning: {file_or_dir} not found in {name}")
                continue

            if src_item.is_dir():
                # Copy entire directory
                dest_item = dest_path / file_or_dir
                shutil.copytree(src_item, dest_item, dirs_exist_ok=True)
                print(f"    Copied directory: {file_or_dir}")
            else:
                # Copy single file
                dest_item = dest_path / file_or_dir
                dest_item.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_item, dest_item)
                print(f"    Copied file: {file_or_dir}")

                # Post-process index.rst to remove "Indices and tables"
                if file_or_dir == "index.rst":
                    remove_indices_section(dest_item)

        # Copy _static directory if it exists
        static_src = source_path / "_static"
        if static_src.exists():
            static_dest = dest_path / "_static"
            shutil.copytree(static_src, static_dest, dirs_exist_ok=True)
            print("    Copied _static directory")

        # Copy index template if specified (for submodules without traditional docs/)
        if "index_template" in config:
            template_file = index_templates_dir / config["index_template"]
            if template_file.exists():
                index_dest = dest_path / "index.rst"
                shutil.copy2(template_file, index_dest)
                print(f"    Copied index from template: {config['index_template']}")
            else:
                print(f"    Warning: Index template not found: {template_file}")

    print("[OK] Submodule documentation copied successfully\n")


def main():
    """Main entry point."""
    try:
        copy_submodule_docs()
        return 0
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
