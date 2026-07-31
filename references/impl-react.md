# React / Vue / Tailwind 实现规则

检测到技术栈为 React / Next.js / Vue / Nuxt / Tailwind CSS / styled-components / CSS Modules 时读取本文件。所有规则必须遵守，不满足则判定为不合格。

## 机械门禁

1. **强制设计令牌**：必须定义完整的"组件色"令牌，使用 Tailwind 的 `tailwind.config.js`、CSS Modules 的变量文件或 styled-components 的 `ThemeProvider`，不允许在组件中写死色值：

   ```
   canvas / surface / surface-hover  — 背景与表面层级
   brand / brand-hover               — 品牌主色及悬停
   text-primary / text-secondary / text-tertiary — 文字层级
   border                            — 边界色
   danger / warning / success + 各自 bg — 语义色（后台/工具类必选）
   shadow-sm / md / lg               — 阴影层级
   max-width / gutter                — 内容宽度与页边距
   ```

   使用 Tailwind 时，在 `theme.extend.colors` 中定义这些令牌；使用 CSS Modules 时在 `:root` 中定义 CSS 变量。缺少任意令牌或对比度不达标视为不合格。业务组件中写死 `#xxxxxx` 的，判定为缺少组件色系统。完整清单见 [视觉系统](visual-system.md)。

2. **组件结构**：每个独立 UI 区块必须是一个命名组件，文件路径与组件名一致。不允许在单个文件中编写所有页面内容。

3. **Tailwind 类名规范**：优先使用 Tailwind 工具类，但自定义颜色、间距和断点必须通过配置扩展实现，不允许使用 `arbitrary value` 语法（如 `bg-[#123456]`）绕开令牌系统。

4. **响应式**：必须至少包含一个移动端断点的显式处理。Tailwind 使用 `md:` 或 `sm:` 前缀；CSS Modules 使用 `@media (max-width: 768px)`。

5. **悬停效果限制**：使用 Tailwind 的 `hover:` 前缀或 CSS Modules 的 `:hover`，但必须确认触屏设备上不会出现粘滞状态。使用 `group-hover:` 的交互需要同时提供触屏回退方案。

6. **动效降级**：必须使用 `@media (prefers-reduced-motion: reduce)` 禁用非必要过渡和动画。使用 Tailwind 时通过 `motion-reduce:` 前缀或全局 CSS 处理。

7. **浮层动效**：Modal、Drawer、Popover、Dropdown、Tooltip 必须包含进入和退出过渡动画。React 使用 `framer-motion` 的 `AnimatePresence` 或纯 CSS `transition` 控制两个方向。进入动画时长 `200ms–300ms`，退出动画 `150ms–200ms`。不允许只有打开瞬间的样式，没有关闭过渡，也不允许退出时长为 0。

8. **过渡品质（新增）**：所有 hover、focus、active、disabled 状态变化必须使用平滑过渡。framer-motion 使用 `transition={{ duration: 0.2 }}`，Tailwind 使用 `transition` + `duration-150` 到 `duration-200`。不允许无过渡的瞬间状态跳变。同一组件库内的过渡时长保持一致。

8. **圆角规则**：所有容器组件（Card、Button、Input、Dialog 等）必须有明确的圆角声明，不允许无定义或依赖组件库默认值。圆角取值（包括 `rounded-none`）必须与产品语气的形状策略一致：直角适合工业感、精密工具或编辑式排版；微圆角适合内容产品和工作界面；较大圆角适合消费品牌和创意展示。但同一页面的圆角不可混杂多种层级，必须归入 2-3 个语义等级。

9. **自定义表单控件**：不允许直接暴露浏览器原生 `<select>`、复选框、单选框、日期选择器。必须使用项目已有的 accessible 组件库（Radix UI / Headless UI / shadcn/ui 的 Select、Checkbox、Radio、Popover 等）。没有成熟组件库时必须自行实现完整键盘导航和表单行为。

## 风格推力

以下规则推动输出达到现代界面的视觉活力。不满足将判定为视觉平庸，要求重新设计。

1. **非标准布局**：至少一个主要区块使用非标准排列方式（错位、不对称分割、内容溢出容器、重叠分层、水平滚动列表、瀑布流）。不允许全部区块都是标准化的左图右文或三卡片网格。

2. **字体组合**：使用至少两种字体角色（衬线 + 无衬线 / 显示体 + 正文 / 等宽 + 比例）。Tailwind 下通过 `font-family` 配置扩展实现。不允许全文只用同一字体家族同一字重。

3. **字号层级**：页面中至少有三个可辨识的字号层级（如 Tailwind 的 `text-xs` / `text-base` / `text-xl`）。不允许所有文字集中在两个字号内。

4. **颜色面积**：品牌色或强调色必须出现在至少一个大于 200px² 的视觉区域（色块、背景、大标题、图形等）。不允许品牌色只用于小按钮和文字链接。

5. **微交互**：至少一个交互元素有非平凡的状态变化（`group-hover` 展开信息、点击切换内容、加载骨架屏、滚动渐入、计数器动画等）。framer-motion 的 `whileHover` / `whileTap` / `animate` 优先使用。不允许所有交互都是简单的 `opacity` 或 `color` 变化。

6. **间距节奏**：区块间距必须至少使用两种不同的值交替（如 Tailwind 的 `mb-24` 和 `mb-12`）。不允许所有区段间距完全相等。

7. **非卡片表达**：至少一个主要内容区块不使用标准卡片/面板容器。使用背景色分区、排版对齐、图片分割、材质差异等替代方式建立内容分组。

## 5 秒自检输出项

当检测到 React / Vue / Tailwind 平台时，在 SKILL.md 要求的自检结果中追加以下项目：

```
☐ 定义了 9 个语义颜色令牌（config 或 :root）
☐ 组件按功能拆分为独立文件
☐ 无 Tailwind arbitrary value 绕开令牌系统
☐ 有响应式断点处理
☐ 浮层实现了进入和退出过渡
☐ 卡片/按钮/弹窗均有明确 rounded 值（含 rounded-none）
☐ 表单控件来自 Radix/Headless UI，非原生 select
☐ 有 prefers-reduced-motion 降级
☐ 至少一个非标准布局
☐ 至少两种字体角色
☐ 至少三个字号层级
☐ 品牌色出现在 > 200px² 区域
☐ 有微交互（framer-motion whileHover 等，duration 0.2s）
☐ 浮层有 AnimatePresence 控制进入+退出动画
☐ 至少一个非卡片分区方式
```

## 样式规范

- 使用项目已有的组件库（Radix UI、shadcn/ui、Headless UI 等），不自造轮子。
- 图标统一来自选定图标库，不混用 Emoji 和行内 SVG。推荐（按优先级）：**lucide-react**（最推荐、树摇友好、TypeScript 支持）、**@heroicons/react**（Tailwind 生态首选）、**react-icons**（包含所有主流图标库）。选择后全项目统一使用，不混用多个图标库。
- 交互反馈（loading、empty、error、disabled states）覆盖完整，不只设计默认状态。
- 避免在 Tailwind 中使用 `@apply` 创建大量抽象类；优先使用组件组合而非类名复用。
