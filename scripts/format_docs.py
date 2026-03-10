#!/usr/bin/env python3
"""Format HED documentation markdown files using mdformat.

Formats only docs/source/*.md (direct files, not submodule subdirectories)
and root-level *.md files.

Can be run as:
- Command (after pip install -e .): hed-format-docs
- Direct Python: python scripts/format_docs.py
- Module: python -m scripts.format_docs

Options:
  --check   Check formatting without making changes (exit 1 if changes needed)
"""

import subprocess
import sys
from pathlib import Path


def main():
    """Run mdformat on documentation markdown files."""
    repo_root = Path(__file__).resolve().parent.parent
    source_dir = repo_root / "docs" / "source"

    # Collect files: direct .md files in docs/source/ (non-recursive)
    # and root-level .md files
    md_files = sorted(source_dir.glob("*.md")) + sorted(repo_root.glob("*.md"))

    if not md_files:
        print("No markdown files found.")
        return 0

    check_mode = "--check" in sys.argv

    cmd = ["mdformat", "--wrap", "no", "--number"]
    if check_mode:
        cmd.append("--check")
    cmd.extend(str(f) for f in md_files)

    mode_label = "Checking" if check_mode else "Formatting"
    print(f"{mode_label} {len(md_files)} markdown file(s)...")

    result = subprocess.run(cmd)

    if result.returncode != 0:
        if check_mode:
            print("mdformat check failed: some files need reformatting.")
        else:
            print("mdformat encountered errors.")
    else:
        if check_mode:
            print("All files are correctly formatted.")
        else:
            print("Done.")

    return result.returncode


if __name__ == "__main__":
    sys.exit(main())
