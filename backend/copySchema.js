const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourcePath = path.join(__dirname, 'src/sql/schema.sql');
const destPath = path.join(__dirname, 'dist/sql/schema.sql');

// Create destination directory if it doesn't exist
fs.mkdirSync(path.dirname(destPath), { recursive: true });

// Copy file
fs.copyFileSync(sourcePath, destPath);

console.log(`Copied schema.sql to ${destPath}`);