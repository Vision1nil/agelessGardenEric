// vercel-build.js
const { execSync } = require('child_process');

// Run the build command
console.log('Running build...');
execSync('npm run build', { stdio: 'inherit' });
