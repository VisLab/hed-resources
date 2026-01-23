@echo off
REM Build unified HED documentation
REM This script copies submodule documentation and builds the unified site

echo ======================================
echo Building Unified HED Documentation
echo ======================================
echo.

REM Activate virtual environment if it exists
if exist ".venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call .venv\Scripts\activate.bat
) else (
    echo Warning: Virtual environment not found at .venv\
    echo Consider creating one with: python -m venv .venv
    echo.
)

REM Step 1: Copy submodule documentation
echo Step 1: Copying submodule documentation...
python docs\build_unified.py
if errorlevel 1 (
    echo Error: Failed to copy submodule documentation
    exit /b 1
)
echo.

REM Step 2: Build Sphinx documentation
echo Step 2: Building Sphinx documentation...
cd docs
sphinx-build -b html source _build\html
if errorlevel 1 (
    echo Error: Sphinx build failed
    cd ..
    exit /b 1
)
cd ..
echo.

echo ======================================
echo Build completed successfully!
echo Documentation available at: docs\_build\html\index.html
echo ======================================
