@echo off
echo Installing/updating dependencies from pyproject.toml...
pip install -e .[docs,quality]

echo.
echo Building documentation...
sphinx-build -b html docs/source docs/_build/html

echo.
echo Documentation built successfully!
echo Static files are in: docs/_build/html/
echo Open docs/_build/html/index.html in your browser to view locally.
