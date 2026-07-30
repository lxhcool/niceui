# NiceUI

面向网页与应用界面的设计、实现和审查工作流。让任何模型（GPT、DeepSeek、Claude 等）都能产出质量稳定的真实界面。

## 安装

```bash
npm install niceui
```

## 使用

### 在 opencode 中使用

在 `opencode.json` 中配置：

```json
{
  "skills": ["niceui"]
}
```

### 直接在 AI 对话中使用

将 `SKILL.md` 的内容作为系统提示词提供给 AI 模型，或引用 `references/` 目录中的文档指导具体实现。

## 结构

```
niceui/
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
│   ├── verification.md        — 验证清单
│   ├── skill-evaluation.md    — 技能自评协议
│   ├── reference-learning.md  — 视觉参考学习
│   └── reference-discovery.md — 参考发现方法
└── agents/
    └── openai.yaml       — OpenAI 代理配置
```

## 核心能力

- **22px 字号上限** — 通过字重/留白/颜色建立层级
- **反模式清单** — 9 条常见模板组合自动拒绝
- **风格推力** — 非标准布局 / 两种字体 / 三级字号 / 微交互 / 间距节奏 / 非卡片分区
- **防巨型 UI** — 卡片限制 / 首屏信息量 / 密度匹配页面类型
- **领域内容模型** — 编码前推导产品核心内容类型
- **平台适配** — Web / React / Flutter 各有一套实现门禁
- **5 秒自检** — 交付前强制输出检查结果

## License

MIT
