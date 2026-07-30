#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const skillPath = path.join(__dirname, '..', 'SKILL.md');
const content = fs.readFileSync(skillPath, 'utf-8');

const args = process.argv.slice(2);

if (args.includes('--dir') || args.includes('-d')) {
  console.log(path.join(__dirname, '..'));
} else if (args.includes('--ref') || args.includes('-r')) {
  const refDir = path.join(__dirname, '..', 'references');
  const refs = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
  console.log('Available references:\n');
  refs.forEach(f => console.log(`  references/${f}`));
} else {
  console.log(content);
}
