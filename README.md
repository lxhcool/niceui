# NiceUI

面向网页与应用界面的设计、实现和审查工作流。让**任何 AI 模型**（GPT、DeepSeek、Claude 等）都能产出质量稳定的真实界面。

## 安装

```bash
npm install ui-nice-skill
```

## 使用

### 在任何 AI 工具中使用

将 `SKILL.md` 的内容作为系统提示词提供给 AI 模型。模型会自动按其中的 6 步工作流（理解任务 → 检查项目 → 确定方向 → 完整实现 → 验证结果 → 迭代）执行设计任务。

对于复杂项目，可同时提供 `references/` 目录中的参考文档作为补充指导。

### 在 opencode 中使用

在 `opencode.json` 中配置：

```json
{
  "skills": ["ui-nice-skill"]
}
```

### 在 Cursor / Windsurf 等 AI IDE 中使用

将 `SKILL.md` 添加到项目 `.rules/` 或 `.cursorrules` 中，AI 编辑器会在代码生成时自动遵循规则。

### 在 ChatGPT / Claude 等对话模型中使用

直接粘贴 `SKILL.md` 完整内容，然后提出你的设计需求。

## 结构

```
ui-nice-skill/
├── SKILL.md             ← 主技能定义（核心原则、工作流程、防呆门禁、输出要求）
├── references/           ← 14 份参考文档
│   ├── impl-web.md       — Web 原生实现规则
│   ├── impl-react.md     — React/Vue/Tailwind 实现规则
│   ├── impl-flutter.md   — Flutter 实现规则
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
- **反模式清单** — 9 条常见模板组合自动拒绝（暖灰+赤陶、后台侧栏模板、登录卡片模板等）
- **风格推力** — 非标准布局 / 两种字体 / 三级字号 / 微交互 / 间距节奏 / 非卡片分区
- **防巨型 UI** — 卡片使用限制 / 首屏信息量 / 密度按页面类型匹配
- **领域内容模型** — 编码前推导产品核心内容类型，不空摆组件
- **平台适配** — Web（CSS）/ React / Flutter 各有一套独立实现门禁
- **5 秒自检** — 交付前强制输出检查结果，防止遗漏规则
- **技术栈自动检测** — 识别项目框架后加载对应的实现规则文件

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
