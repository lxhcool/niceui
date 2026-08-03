# NiceUI

面向网页与应用界面的设计、实现和审查工作流。让**任何 AI 模型**（GPT、DeepSeek、Claude 等）都能产出质量稳定的真实界面。

## 安装

```bash
# 本地安装（推荐用于项目）
npm install ui-nice-skill

# 全局安装（终端直接输出 skill 内容）
npm install -g ui-nice-skill
niceui                     # 输出完整 SKILL.md
niceui ls                  # 列出支持的 CLI 工具
niceui -r / --ref          # 列出可用参考文档
niceui -d / --dir          # 输出安装路径
niceui -h / --help         # 显示帮助
```

## 使用

### 在任何 AI 工具中使用

将 `SKILL.md` 的内容作为系统提示词提供给 AI 模型。模型会自动按其中的 6 步工作流（理解任务 → 检查项目 → 确定方向 → 完整实现 → 验证结果 → 迭代）执行设计任务。

对于复杂项目，可同时提供 `references/` 目录中的参考文档作为补充指导。

### 一键适配所有 CLI 工具

skill 本体使用 Agent Skills 标准（`SKILL.md` + frontmatter），可被多数 CLI 工具原生加载。用 `niceui` 命令统一安装：

```bash
niceui i all               # 一键安装到所有工具

# 按工具单独安装（skill 复制到目录 / 规则写入项目文件）
niceui i claude            # Claude Code  → ~/.claude/skills/niceui/
niceui i opencode          # opencode     → ~/.config/opencode/skill/niceui/
niceui i cursor            # Cursor       → .cursor/skills/ + .cursor/rules/niceui.mdc
niceui i windsurf          # Windsurf     → .windsurf/rules/niceui.md
niceui i codex             # Codex CLI    → ./AGENTS.md（同 gemini / copilot）
niceui i aider             # Aider        → ./CONVENTIONS.md

# 只输出规则文件内容（含内联参考文档，不写入文件）
niceui r codex             # 打印 AGENTS.md 内容
niceui r codex --write     # 写入 ./AGENTS.md（--force 覆盖已安装）
```

| CLI 工具 | 安装方式 | 位置 |
|---|---|---|
| Claude Code | skill | `~/.claude/skills/niceui/` |
| opencode | skill | `~/.config/opencode/skill/niceui/` |
| Cursor | skill + 规则 | `.cursor/skills/` + `.cursor/rules/niceui.mdc` |
| Windsurf | 规则 | `.windsurf/rules/niceui.md` |
| Codex / Gemini / Copilot | 规则 | `./AGENTS.md` |
| Aider | 规则 | `./CONVENTIONS.md` |

快捷命令：`niceui i <工具>`（install）、`niceui r <工具>`（rules）、`niceui ls`（list）。

### 在 opencode 中使用

在 `opencode.json` 中配置：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "skills": {
    "paths": ["./node_modules/ui-nice-skill"]
  }
}
```

或直接运行 `niceui i opencode` 安装到全局 `~/.config/opencode/skill/niceui/`，所有项目自动生效。

### 在 Cursor / Windsurf 等 AI IDE 中使用

将 `SKILL.md` 添加到项目 `.rules/` 或 `.cursorrules` 中，AI 编辑器会在代码生成时自动遵循规则。

### 在 ChatGPT / Claude 等对话模型中使用

直接粘贴 `SKILL.md` 完整内容，然后提出你的设计需求。

## 结构

```
ui-nice-skill/
├── SKILL.md             ← 主技能定义（核心原则、工作流程、防呆门禁、输出要求）
├── references/           ← 18 份参考文档
│   ├── impl-web.md       — Web 原生实现规则
│   ├── impl-react.md     — React/Vue/Tailwind 实现规则
│   ├── impl-flutter.md   — Flutter 实现规则
│   ├── modify-existing.md — 修改/重构已有项目的保留式流程
│   ├── motion-canvas.md  — 官网/品牌页的沉浸动效与 Canvas 技术目录
│   ├── design-direction.md  — 26 种设计气质方向
│   ├── design-methodology.md — 设计流程方法论
│   ├── design-baseline.md    — 跨风格设计基线
│   ├── visual-system.md      — 字体与色彩系统
│   ├── interaction-baseline.md — 交互状态与动效
│   ├── design-decision.md    — 设计决策方法
│   ├── product-specificity.md — 产品指纹与防模板
│   ├── composition-detail.md  — 构图模式
│   └── ... 更多参考文档
└── agents/
    └── openai.yaml       — OpenAI 代理配置
```

## 核心能力

- **22px 字号上限** — 通过字重/留白/颜色建立层级，不使用大标题
- **反模式清单** — 10 条常见模板组合自动拒绝（暖灰+赤陶、暖灰+灰绿磨砂默认模板、后台侧栏模板、登录卡片模板等）
- **跨样例差异** — 连续交付必须拉开色相家族/色彩模式差异；批量产出按配额制分配（同一色相家族占比 ≤ 1/3，至少覆盖 3 种色彩模式），防止示例集同质化
- **风格推力** — 非标准布局 / 两种字体 / 三级字号 / 微交互 / 间距节奏 / 非卡片分区
- **沉浸动效** — 官网/品牌/创意页默认至少一个 Canvas/滚动/鼠标/入场动效焦点，可降级且不遮挡内容
- **防巨型 UI** — 卡片使用限制 / 首屏信息量 / 密度按页面类型匹配
- **领域内容模型** — 编码前推导产品核心内容类型，不空摆组件
- **平台适配** — Web（CSS）/ React / Flutter 各有一套独立实现门禁
- **5 秒自检** — 交付前强制输出检查结果，防止遗漏规则
- **技术栈自动检测** — 识别项目框架后加载对应的实现规则文件
- **任务分流** — 从零创建走完整设计流程；修改/重构走保留式流程（提取现状 → 最小改动 → 对比验证），不推翻现有视觉语言

## 适合的场景

- 网站首页、着陆页设计
- 后台管理系统
- 电商平台
- 音乐/视频内容平台
- 博客/内容网站
- 移动应用界面（Flutter）
- 任何需要 AI 生成 UI 的场景

## License

MIT
