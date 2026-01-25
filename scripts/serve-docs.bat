@echo off
REM Serve HED documentation locally
REM This script is a wrapper for the cross-platform Python serve script

REM Change to repository root (parent of scripts directory)
cd /d "%~dp0.."

REM Activate virtual environment if it exists
if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
)

REM Run the cross-platform Python serve script
python "%~dp0serve_docs.py"
