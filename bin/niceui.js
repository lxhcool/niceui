#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const SKILL_PATH = path.join(ROOT, 'SKILL.md');
const REF_DIR = path.join(ROOT, 'references');

const TOOLS = {
  claude: {
    name: 'Claude Code',
    kind: 'skill',
    dir: '~/.claude/skills/niceui',
  },
  opencode: {
    name: 'opencode',
    kind: 'skill',
    dir: '~/.config/opencode/skill/niceui',
  },
  cursor: {
    name: 'Cursor',
    kind: 'both',
    dir: '.cursor/skills/niceui',
    file: '.cursor/rules/niceui.mdc',
    format: 'mdc',
  },
  windsurf: {
    name: 'Windsurf',
    kind: 'rules',
    file: '.windsurf/rules/niceui.md',
  },
  codex: {
    name: 'Codex CLI',
    kind: 'rules',
    file: 'AGENTS.md',
  },
  gemini: {
    name: 'Gemini CLI',
    kind: 'rules',
    file: 'AGENTS.md',
  },
  copilot: {
    name: 'GitHub Copilot CLI',
    kind: 'rules',
    file: 'AGENTS.md',
  },
  aider: {
    name: 'Aider',
    kind: 'rules',
    file: 'CONVENTIONS.md',
  },
};

function resolve(p) {
  return p.replace(/^~(?=$|\/)/, os.homedir());
}

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

function buildRules(key) {
  const tool = TOOLS[key];
  const skill = stripFrontmatter(fs.readFileSync(SKILL_PATH, 'utf-8'));
  const refs = fs.readdirSync(REF_DIR).filter(f => f.endsWith('.md')).sort();

  let body = skill;
  body += '\n\n---\n\n## 参考文档（内联）\n\n以下为 NiceUI 参考文档全文，编码过程中按需查阅：\n\n';
  for (const f of refs) {
    const c = fs.readFileSync(path.join(REF_DIR, f), 'utf-8');
    body += `### ${f}\n\n${c.trim()}\n\n---\n\n`;
  }

  if (tool.format === 'mdc') {
    body = `---\ndescription: NiceUI — 网页与应用界面设计、实现与审查工作流\nglobs:\nalwaysApply: true\n---\n\n${body}`;
  }
  return body;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function installSkill(key) {
  const tool = TOOLS[key];
  const dest = resolve(tool.dir);
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(SKILL_PATH, path.join(dest, 'SKILL.md'));
  copyDir(REF_DIR, path.join(dest, 'references'));
  console.log(`✓ ${tool.name} skill → ${dest}`);
}

function writeRules(key, force = false) {
  const tool = TOOLS[key];
  const file = resolve(tool.file);
  const content = buildRules(key);

  if (fs.existsSync(file)) {
    const cur = fs.readFileSync(file, 'utf-8');
    if (cur.includes('NiceUI') && !force) {
      console.log(`· ${tool.name} 已安装（${file}），跳过。加 --force 可覆盖。`);
      return;
    }
    fs.writeFileSync(file, content);
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  console.log(`✓ ${tool.name} 规则 → ${file}`);
}

function installTool(key) {
  const tool = TOOLS[key];
  if (tool.kind === 'skill' || tool.kind === 'both') installSkill(key);
  if (tool.kind === 'rules' || tool.kind === 'both') writeRules(key);
}

function installAll() {
  for (const key of Object.keys(TOOLS)) installTool(key);
}

function listRefs() {
  const refs = fs.readdirSync(REF_DIR).filter(f => f.endsWith('.md'));
  console.log('Available references:\n');
  refs.forEach(f => console.log(`  references/${f}`));
}

function listTools() {
  const pad = n => n + ' '.repeat(Math.max(1, 12 - n.length));
  console.log(`${pad('工具')}${pad('方式')}位置`);
  console.log('-'.repeat(60));
  for (const [key, t] of Object.entries(TOOLS)) {
    const target = t.kind === 'skill' ? t.dir : (t.kind === 'both' ? `${t.dir} + ${t.file}` : t.file);
    console.log(`${pad(key)}${pad(t.kind)}${target}`);
  }
  console.log('\n安装：niceui i <工具> 或 niceui install <工具>（all = 全部）');
  console.log('输出规则：niceui r <工具> 或 niceui rules <工具>（加 --write 写入文件）');
}

function printHelp() {
  console.log(`NiceUI skill CLI

用法：
  niceui                    输出完整 SKILL.md
  niceui ls                 列出支持的 CLI 工具
  niceui i <工具|all>       安装（skill 复制到目录 / 规则写入项目文件）
  niceui r <工具> [--write] 打印规则文件内容（--write 写入默认位置）
  niceui -d / --dir         输出安装路径
  niceui -r / --ref         列出参考文档
  niceui -h / --help        显示帮助

快捷命令：
  niceui i claude           → ~/.claude/skills/niceui/
  niceui i opencode         → ~/.config/opencode/skill/niceui/
  niceui i cursor           → .cursor/skills/ + .cursor/rules/niceui.mdc
  niceui i codex            → ./AGENTS.md（同 gemini / copilot）
  niceui i aider            → ./CONVENTIONS.md
  niceui i all              → 安装到所有工具
  niceui r codex            → 打印 AGENTS.md 内容（含内联参考文档）
`);
}

const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('-'));
const rest = args.filter(a => !a.startsWith('-'));

if (flags.includes('-h') || flags.includes('--help')) {
  printHelp();
} else if (flags.includes('-d') || flags.includes('--dir')) {
  console.log(ROOT);
} else if (flags.includes('-r') || flags.includes('--ref')) {
  listRefs();
} else {
  const cmd = rest[0];
  const tool = rest[1];

  if (cmd === 'install' || cmd === 'i') {
    if (!tool || tool === 'all') installAll();
    else if (TOOLS[tool]) installTool(tool);
    else { console.log(`未知工具：${tool}`); listTools(); }
  } else if (cmd === 'rules' || cmd === 'r') {
    if (tool && TOOLS[tool]) {
      const force = flags.includes('-f') || flags.includes('--force');
      if (flags.includes('-w') || flags.includes('--write')) writeRules(tool, force);
      else console.log(buildRules(tool));
    } else { console.log(`未知工具：${tool}`); listTools(); }
  } else if (cmd === 'list' || cmd === 'ls') {
    listTools();
  } else {
    console.log(fs.readFileSync(SKILL_PATH, 'utf-8'));
  }
}
