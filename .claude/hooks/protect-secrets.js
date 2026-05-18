// HOOK: protect-secrets.js
// Runs BEFORE Claude reads, edits, or writes any file.
// Blocks access to files containing credentials.

const input = JSON.parse(process.argv[2] || '{}');
const filePath = input.file_path || input.path || '';

// Files Claude should never read or modify
const PROTECTED_FILES = [
  '.env',
  '.env.local', 
  '.env.production',
  'secrets/',
  '.pem',
  '.key',
];

// Check if the file Claude wants to touch is protected
const isProtected = PROTECTED_FILES.some(pattern => 
  filePath.includes(pattern)
);

if (isProtected) {
  console.error(`HOOK BLOCKED: Attempt to access protected file.`);
  console.error(`File: ${filePath}`);
  console.error(`Credentials are read-only by the system, not by Claude.`);
  process.exit(1);
}

process.exit(0);