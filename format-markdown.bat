@echo off
REM Format all markdown files with mdformat
REM This script ensures consistent formatting without pre-commit hooks

echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo.
echo Installing/updating mdformat and plugins...
pip install mdformat==0.7.22 mdformat-myst==0.2.2 mdformat-tables==1.0.0

echo.
echo Formatting markdown files in docs/source/...
mdformat --wrap no --number docs\source\

echo.
echo Formatting markdown files in root directory...
for %%f in (*.md) do (
    mdformat --wrap no --number "%%f"
)

echo.
echo Markdown formatting complete!
echo.
echo Next steps:
echo   1. Review the changes with: git diff
echo   2. Stage files: git add .
echo   3. Commit: git commit -m "Apply markdown formatting"
echo.
pause
