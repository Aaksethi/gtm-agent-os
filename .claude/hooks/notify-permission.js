// HOOK: notify-permission.js
// Runs when Claude hits a permission block or needs your input.
// Logs the event so you always know when the agent stopped and why.
// In production you'd connect this to Slack or email.

const input = JSON.parse(process.argv[2] || '{}');
const eventType = input.event_type || 'unknown';
const details = input.details || '';

const timestamp = new Date().toISOString();

// Log to a file so you have a record of every time the agent paused
const fs = require('fs');
const logEntry = `[${timestamp}] EVENT: ${eventType} | ${details}\n`;

try {
  fs.appendFileSync('memory/vault/agent-events.log', logEntry);
  console.log(`Permission event logged: ${eventType}`);
} catch (error) {
  console.log(`Could not write log: ${error.message}`);
}

process.exit(0);