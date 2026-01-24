@echo off
echo Serving documentation at http://localhost:8000
python -m http.server --directory docs/_build/html 8000