@echo off
REM Build verification script for Windows

echo 🧹 Cleaning previous builds...
call npm run clean

echo 🔨 Building production bundle...
call npm run build

echo 📁 Checking dist directory contents...
echo Contents of dist directory:
dir dist

echo.
echo 🔍 Checking for test files in dist...
for /r dist %%f in (*.test.*) do (
    echo ❌ WARNING: Test file found: %%f
    set FOUND_TESTS=1
)

if not defined FOUND_TESTS (
    echo ✅ SUCCESS: No test files found in dist directory!
)

echo.
echo 🎯 Build verification complete!
pause
