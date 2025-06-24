#!/bin/bash
# Build verification script

echo "🧹 Cleaning previous builds..."
npm run clean

echo "🔨 Building production bundle..."
npm run build

echo "📁 Checking dist directory contents..."
echo "Contents of dist directory:"
ls -la dist/

echo ""
echo "🔍 Checking for test files in dist..."
if find dist -name "*.test.*" -o -name "*test*" | grep -q .; then
    echo "❌ WARNING: Test files found in dist directory!"
    find dist -name "*.test.*" -o -name "*test*"
else
    echo "✅ SUCCESS: No test files found in dist directory!"
fi

echo ""
echo "📊 Bundle size analysis:"
du -sh dist/*

echo ""
echo "🎯 Build verification complete!"
