@echo off
echo ===================================================
echo Pushing local repository to GitHub...
echo ===================================================

cd /d "%~dp0"

if not exist ".git" (
    echo Initializing Git repository...
    git init
)

git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/athulkrishnatp/EDITOR-PORTFOLIO.git

echo Staging files...
git add .

echo Committing files...
git commit -m "Initial commit of portfolio project"

echo.
echo The remote repository already has some files. What would you like to do?
echo [1] Force Push (OVERWRITE everything on GitHub with your local files)
echo [2] Pull and Merge (Keep files on GitHub and merge them with local files)
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo Force pushing to GitHub...
    git push -f -u origin main
) else if "%choice%"=="2" (
    echo Pulling remote changes...
    git pull origin main --allow-unrelated-histories
    echo Pushing merged changes to GitHub...
    git push -u origin main
) else (
    echo Invalid choice. Exiting...
)

echo ===================================================
echo Done!
pause
