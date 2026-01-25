#!/usr/bin/env python3
"""Build unified HED documentation.

This script:
1. Copies submodule documentation using build_unified.py
2. Builds Sphinx documentation to HTML

Can be run as:
- Command (after pip install -e .): hed-build-docs
- Direct Python: python scripts/build_docs.py
- Module: python -m scripts.build_docs
"""

import subprocess
import sys
from pathlib import Path


def main():
    """Build the unified HED documentation."""
    # Get the repository root (parent of scripts directory)
    repo_root = Path(__file__).resolve().parent.parent
    docs_dir = repo_root / "docs"
    build_unified_script = docs_dir / "build_unified.py"
    source_dir = docs_dir / "source"
    build_dir = docs_dir / "_build" / "html"

    print("=" * 60)
    print("Building Unified HED Documentation")
    print("=" * 60)
    print()

    # Step 1: Copy submodule documentation
    print("Step 1: Copying submodule documentation...")
    try:
        subprocess.run(
            [sys.executable, str(build_unified_script)],
            cwd=repo_root,
            check=True,
        )
        print("[OK] Submodule documentation copied successfully")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Failed to copy submodule documentation: {e}", file=sys.stderr)
        return 1
    print()

    # Step 2: Build Sphinx documentation
    print("Step 2: Building Sphinx documentation...")
    try:
        subprocess.run(
            ["sphinx-build", "-b", "html", str(source_dir), str(build_dir)],
            cwd=repo_root,
            check=True,
        )
        print("[OK] Sphinx build completed successfully")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Sphinx build failed: {e}", file=sys.stderr)
        return 1
    except FileNotFoundError:
        print("[ERROR] sphinx-build not found. Install with: pip install -e .[docs]", file=sys.stderr)
        return 1
    print()

    print("=" * 60)
    print("Build completed successfully!")
    print(f"Documentation available at: {build_dir / 'index.html'}")
    print("=" * 60)
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
