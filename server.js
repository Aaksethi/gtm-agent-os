// GTM Agent OS — Local Backend Server
// Connects the dashboard to Claude Code
// Run with: node server.js

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));  // serves dashboard.html from root

// ─────────────────────────────────────────
// ROUTE 1: Serve the dashboard
// ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// ─────────────────────────────────────────
// ROUTE 2: Run a skill
// Dashboard POSTs here when you click a skill button
// ─────────────────────────────────────────
app.post('/run-skill', (req, res) => {
  const { skill, inputs } = req.body;

  if (!skill) {
    return res.status(400).json({ error: 'No skill specified' });
  }

  // Build the prompt Claude Code will receive
  const prompt = buildPrompt(skill, inputs);

  console.log(`\n[SERVER] Running skill: ${skill}`);
  console.log(`[SERVER] Prompt: ${prompt.substring(0, 100)}...`);

  // Run Claude Code in --print mode
  // --print means: run once, print output, exit
  // No interactive session needed
  const claude = spawn('claude', [
    '--print',
    '--dangerously-skip-permissions',
    prompt
  ], {
    cwd: __dirname,  // run from project root so it finds CLAUDE.md
    shell: true
  });

  let output = '';
  let error = '';

  claude.stdout.on('data', (data) => {
    output += data.toString();
    process.stdout.write(data);  // show in server terminal too
  });

  claude.stderr.on('data', (data) => {
    error += data.toString();
  });

  claude.on('close', (code) => {
    console.log(`[SERVER] Skill finished. Exit code: ${code}`);

    // Save output to vault
    const timestamp = new Date().toISOString().split('T')[0];
    const outputPath = path.join(
      __dirname,
      'memory', 'vault', 'output',
      `${skill}-${timestamp}.md`
    );

    fs.writeFileSync(outputPath, `# ${skill} output\n\nDate: ${timestamp}\n\n${output}`);
    console.log(`[SERVER] Output saved to: ${outputPath}`);

    // Update MEMORY.md
    const memoryEntry = `\n## [${timestamp}] — Skill run via dashboard\n- Skill: ${skill}\n- Status: ${code === 0 ? 'completed' : 'error'}\n- Output saved to: memory/vault/output/${skill}-${timestamp}.md\n`;
    fs.appendFileSync(path.join(__dirname, 'MEMORY.md'), memoryEntry);

    res.json({
      success: code === 0,
      skill: skill,
      output: output,
      error: error,
      outputFile: `memory/vault/output/${skill}-${timestamp}.md`
    });
  });

  claude.on('error', (err) => {
    console.error(`[SERVER] Failed to start Claude:`, err);
    res.status(500).json({
      success: false,
      error: `Failed to start Claude Code: ${err.message}`
    });
  });
});

// ─────────────────────────────────────────
// ROUTE 3: Read MEMORY.md for dashboard
// ─────────────────────────────────────────
app.get('/memory', (req, res) => {
  try {
    const memory = fs.readFileSync(
      path.join(__dirname, 'MEMORY.md'), 'utf8'
    );
    res.json({ content: memory });
  } catch (err) {
    res.json({ content: 'MEMORY.md not found' });
  }
});

// ─────────────────────────────────────────
// ROUTE 4: Read vault file list
// ─────────────────────────────────────────
app.get('/vault', (req, res) => {
  try {
    const outputDir = path.join(__dirname, 'memory', 'vault', 'output');
    const rawDir = path.join(__dirname, 'memory', 'vault', 'raw');

    const outputs = fs.existsSync(outputDir)
      ? fs.readdirSync(outputDir) : [];
    const raws = fs.existsSync(rawDir)
      ? fs.readdirSync(rawDir) : [];

    res.json({
      outputs: outputs,
      raws: raws,
      total: outputs.length + raws.length
    });
  } catch (err) {
    res.json({ outputs: [], raws: [], total: 0 });
  }
});

// ─────────────────────────────────────────
// ROUTE 5: Run a raw command
// Dashboard command bar uses this
// ─────────────────────────────────────────
app.post('/run-command', (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command specified' });
  }

  console.log(`\n[SERVER] Running command: ${command}`);

  const claude = spawn('claude', [
    '--print',
    '--dangerously-skip-permissions',
    command
  ], {
    cwd: __dirname,
    shell: true
  });

  let output = '';

  claude.stdout.on('data', (data) => {
    output += data.toString();
    process.stdout.write(data);
  });

  claude.on('close', (code) => {
    // Save to vault
    const timestamp = new Date().toISOString().split('T')[0];
    const outputPath = path.join(
      __dirname,
      'memory', 'vault', 'output',
      `command-${Date.now()}.md`
    );
    fs.writeFileSync(outputPath, `# Command output\n\nDate: ${timestamp}\nCommand: ${command}\n\n${output}`);

    // Update MEMORY.md
    const memoryEntry = `\n## [${timestamp}] — Command via dashboard\n- Command: ${command}\n- Output saved to vault\n`;
    fs.appendFileSync(path.join(__dirname, 'MEMORY.md'), memoryEntry);

    res.json({ success: code === 0, output, command });
  });

  claude.on('error', (err) => {
    res.status(500).json({
      success: false,
      error: `Failed to start Claude Code: ${err.message}`
    });
  });
});

// ─────────────────────────────────────────
// PROMPT BUILDER
// Translates skill name + inputs into
// a Claude Code prompt that references
// the right skill file
// ─────────────────────────────────────────
function buildPrompt(skill, inputs) {
  const skillPaths = {
    'positioning-icp':      '.claude/skills/gtm/positioning-icp.md',
    'lead-enrichment':      '.claude/skills/gtm/lead-enrichment.md',
    'gtm-metrics':          '.claude/skills/gtm/gtm-metrics.md',
    'social-selling':       '.claude/skills/gtm/social-selling.md',
    'n8n-clay-integration': '.claude/skills/gtm/n8n-clay-integration.md',
    'clay-outbound-prep':   '.claude/skills/clay/clay-outbound-prep.md',
    'clay-icp-score':       '.claude/skills/clay/clay-icp-score.md',
    'clay-reply-classify':  '.claude/skills/clay/clay-reply-classify.md',
    'ai-cold-outreach':     '.claude/skills/outreach/ai-cold-outreach.md',
  };

  const skillFile = skillPaths[skill] || '';
  const inputText = inputs
    ? Object.entries(inputs)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';

  return `Read CLAUDE.md, BRAND.md, and MEMORY.md first.
Then read the skill file at: ${skillFile}
Follow the skill instructions exactly.
User inputs:
${inputText}

Execute the skill and provide the full output.`;
}

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════╗');
  console.log('║     GTM Agent OS — Server Ready    ║');
  console.log('╠════════════════════════════════════╣');
  console.log(`║  Dashboard: http://localhost:${PORT}   ║`);
  console.log('║  Claude Code: connected            ║');
  console.log('║  Vault: memory/vault/output/       ║');
  console.log('╚════════════════════════════════════╝\n');
});