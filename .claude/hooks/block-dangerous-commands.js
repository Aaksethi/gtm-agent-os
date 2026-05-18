// HOOK: block-dangerous-commands.js
// Runs BEFORE every Bash command Claude tries to execute.
// If the command is dangerous, this hook kills it before it runs.

const input = JSON.parse(process.argv[2] || '{}');
const command = input.command || '';

// Commands that could destroy your project or system
const DANGEROUS_PATTERNS = [
  'rm -rf',           // Delete everything recursively
  'del /f /s /q',     // Windows version of above
  'format c:',        // Format your hard drive
  'DROP TABLE',       // Wipe a database table
  'DROP DATABASE',    // Wipe an entire database
  ':(){:|:&};:',      // Fork bomb - crashes your system
  'curl | sh',        // Download and run unknown scripts
  'wget | sh',        // Same as above
  '> /dev/sda',       // Overwrite hard drive
  'mkfs',             // Format a disk
];

const isDangerous = DANGEROUS_PATTERNS.some(pattern => 
  command.toLowerCase().includes(pattern.toLowerCase())
);

if (isDangerous) {
  console.error(`HOOK BLOCKED: Dangerous command detected.`);
  console.error(`Command: ${command}`);
  console.error(`This command was stopped before execution.`);
  process.exit(1); // Exit code 1 = blocked
}

// Command is safe - allow it through
process.exit(0); // Exit code 0 = allowed