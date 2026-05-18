// HOOK: auto-stage.js  
// Runs AFTER Claude edits or writes any file.
// Automatically stages the file in Git so nothing gets lost.
// Same as typing "git add filename" after every save.

const { execSync } = require('child_process');
const input = JSON.parse(process.argv[2] || '{}');
const filePath = input.file_path || input.path || '';

if (filePath) {
  try {
    execSync(`git add "${filePath}"`, { stdio: 'pipe' });
    console.log(`Auto-staged: ${filePath}`);
  } catch (error) {
    // Git not initialized yet - that's fine, skip silently
    console.log(`Skipped staging (git not ready): ${filePath}`);
  }
}

process.exit(0);
