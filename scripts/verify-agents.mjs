import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const requiredSections = [
  'Roles',
  'Who edits what',
  'Protected assertions',
  'The healer',
  'Gate rules',
  'Secrets',
];

let failed = false;
let agents;
try {
  agents = readFileSync('AGENTS.md', 'utf8');
} catch {
  console.error('verify:agents: AGENTS.md is missing or unreadable.');
  process.exit(1);
}

for (const section of requiredSections) {
  if (!agents.split(/\r?\n/).includes(`## ${section}`)) {
    console.error(`verify:agents: AGENTS.md is missing section "${section}".`);
    failed = true;
  }
}

try {
  const diff = execFileSync('git', ['diff', '--no-ext-diff', '--unified=0', 'HEAD', '--', 'tests/'], {
    encoding: 'utf8',
  });
  const changedLines = diff.split('\n').filter((line) => /^[+-]/.test(line) && !/^[+-]{3}/.test(line));
  const businessRuleId = /\bBR-[A-Z0-9]+(?:-[A-Z0-9]+)*\b/;
  const violations = changedLines.filter((line) => businessRuleId.test(line));
  if (violations.length > 0) {
    console.error('verify:agents: git diff changes a test assertion line containing a BR-ID:');
    for (const line of violations) console.error(line);
    failed = true;
  }
} catch (error) {
  console.error(`verify:agents: could not inspect git diff (${error.message}).`);
  failed = true;
}

if (failed) process.exit(1);
console.log('verify:agents: required sections are present and no BR-ID assertion lines changed.');
