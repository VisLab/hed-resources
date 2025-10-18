@echo off
call .venv\Scripts\activate.bat

echo Building Sphinx documentation...
sphinx-build -b html docs/source docs/_build/html

echo.
echo Checking links in built documentation...
linkchecker --check-extern docs/_build/html/index.html

echo.
echo Link checking complete!
pause
