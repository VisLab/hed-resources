#!/usr/bin/env python3
"""Serve HED documentation locally with a simple HTTP server.

Can be run as:
- Command (after pip install -e .): hed-serve-docs
- Direct Python: python scripts/serve_docs.py
- Module: python -m scripts.serve_docs
"""

import http.server
import socketserver
import sys
import webbrowser
from pathlib import Path


def main():
    """Serve the built documentation on localhost."""
    # Get the repository root (parent of scripts directory)
    repo_root = Path(__file__).resolve().parent.parent
    html_dir = repo_root / "docs" / "_build" / "html"

    if not html_dir.exists():
        print("[ERROR] Documentation not built yet!", file=sys.stderr)
        print(f"Expected directory: {html_dir}", file=sys.stderr)
        print(
            "Run 'hed-build-docs' or 'python scripts/build_docs.py' first.",
            file=sys.stderr,
        )
        return 1

    PORT = 8000

    class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(html_dir), **kwargs)

        def log_message(self, format, *args):
            # Custom logging format
            print(f"[{self.log_date_time_string()}] {format % args}")

    print("=" * 60)
    print("HED Documentation Server")
    print("=" * 60)
    print(f"Serving documentation from: {html_dir}")
    print(f"URL: http://localhost:{PORT}")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    print()

    # Open browser
    try:
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception as e:
        print(f"Could not open browser automatically: {e}")

    # Start server
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n[OK] Server stopped")
        return 0
    except OSError as e:
        if "address already in use" in str(e).lower():
            print(f"[ERROR] Port {PORT} is already in use", file=sys.stderr)
            print(
                "Another server may be running. Try stopping it first.",
                file=sys.stderr,
            )
        else:
            print(f"[ERROR] Starting server: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
