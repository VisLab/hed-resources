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
    """Remove 'Indices and tables' section from an index.rst file.

    This prevents duplicate index entries in the sidebar when integrating
    submodule documentation into the unified docs.
    """
    content = index_file.read_text(encoding="utf-8")

    # Find and remove the "Indices and tables" section
    lines = content.split("\n")
    filtered_lines = []
    skip_section = False

    for i, line in enumerate(lines):
        if line.strip() == "Indices and tables":
            # Check if next line is the RST underline
            if i + 1 < len(lines) and set(lines[i + 1].strip()) == {"="}:
                skip_section = True
                continue

        if skip_section:
            # Skip until we hit a blank line followed by content
            if line.strip() == "":
                continue
            elif line.strip().startswith("*"):
                # Skip bullet list items in the indices section
                continue
            else:
                # End of section, stop skipping
                skip_section = False

        if not skip_section:
            filtered_lines.append(line)

    # Remove trailing blank lines
    while filtered_lines and not filtered_lines[-1].strip():
        filtered_lines.pop()

    index_file.write_text("\n".join(filtered_lines) + "\n", encoding="utf-8")
    print(f"      Removed 'Indices and tables' section from {index_file.name}")


def copy_submodule_docs():
    """Copy documentation from submodules into the source tree."""

    # Define source and destination paths
    repo_root = Path(__file__).parent.parent
    source_dir = repo_root / "docs" / "source"
    submodules_dir = repo_root / "submodules"

    # Define submodules to include
    submodules = {
        "hed-python": {
            "source": submodules_dir / "hed-python" / "docs",
            "dest": source_dir / "hed-python",
            "files": ["index.rst", "introduction.md", "user_guide.md", "api/"],
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

                # Post-process index.rst for python-tools to remove "Indices and tables"
                if name == "hed-python" and file_or_dir == "index.rst":
                    remove_indices_section(dest_item)

        # Copy _static directory if it exists
        static_src = source_path / "_static"
        if static_src.exists():
            static_dest = dest_path / "_static"
            shutil.copytree(static_src, static_dest, dirs_exist_ok=True)
            print("    Copied _static directory")

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
