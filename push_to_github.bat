@echo off
echo ===================================================
echo Pushing local repository to GitHub...
echo ===================================================

:: Ensure we are in the correct directory
cd /d "%~dp0"

:: Initialize repository if not already initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
)

:: Rename branch to main
git branch -M main

:: Add or update remote origin
git remote remove origin >nul 2>&1
git remote add origin https://github.com/athulkrishnatp/EDITOR-PORTFOLIO.git

:: Stage all files
echo Staging files...
git add .

:: Commit files
echo Committing files...
git commit -m "Initial commit of portfolio project"

:: Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo ===================================================
echo Done!
pause
