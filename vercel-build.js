const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = '.vercel/output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create the Vercel configuration
const vercelConfig = {
  version: 3,
  buildCommand: 'npm run build',
  installCommand: 'npm install',
  outputDirectory: '.next'
};

// Write the Vercel configuration
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(vercelConfig, null, 2)
);

// Create static directory for static files
const staticDir = path.join(outputDir, 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Run the build
console.log('Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
