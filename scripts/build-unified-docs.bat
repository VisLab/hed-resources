@echo off
REM Build unified HED documentation
REM This script is a wrapper for the cross-platform Python build script

echo ======================================
echo Building Unified HED Documentation
echo ======================================
echo.

REM Change to repository root (parent of scripts directory)
cd /d "%~dp0.."

REM Activate virtual environment if it exists
if exist ".venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call .venv\Scripts\activate.bat
) else (
    echo Warning: Virtual environment not found at .venv\
    echo Consider creating one with: python -m venv .venv
    echo.
)

REM Run the cross-platform Python build script
python "%~dp0build_docs.py"
if errorlevel 1 (
    exit /b 1
)
