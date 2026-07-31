# Flutter 实现规则

检测到技术栈为 Flutter / Dart 时读取本文件。所有规则必须遵守，不满足则判定为不合格。

## 机械门禁

1. **强制 ThemeData**：必须在 `MaterialApp` 的 `theme` 中定义完整的"组件色"，不允许在 Widget 中直接写死 `Color()` 值。至少包含背景/表面层级、品牌主色及悬停、文字层级（primary/secondary/tertiary）、边框色、阴影；后台/工具类额外包含 danger/warning/success 语义色及弱背景：

   ```dart
   ThemeData(
     extensions: [
       AppTheme(
         canvas: Color(0xFF...),
         surface: Color(0xFF...),
         brand: Color(0xFF...),
         textPrimary: Color(0xFF...),
         textSecondary: Color(0xFF...),
         textTertiary: Color(0xFF...),
         border: Color(0xFF...),
         danger: Color(0xFF...),
         success: Color(0xFF...),
         warning: Color(0xFF...),
       ),
     ],
   )
   ```

   或者使用 `ThemeData` 自带的 `colorScheme` 扩展。缺少任意语义色或对比度不达标视为不合格。Widget 中写死 `Color(0xFF...)` 的，判定为缺少组件色系统。完整清单见 [视觉系统](visual-system.md)。

2. **自定义滚动条**：必须使用 `ScrollbarTheme` 自定义轨道和滑块样式，不允许使用平台默认滚动条外观。

3. **响应式**：必须使用 `LayoutBuilder`、`MediaQuery` 或 `Breakpoint` 处理至少一个窄屏断点。不允许直接使用硬编码像素宽度假设所有屏幕尺寸一致。

4. **字体字号上限**：全应用任何 `TextStyle.fontSize` 不得超过 `22`。使用 `TextTheme` 统一管理字号层级，不允许在 Widget 中散落任意字号值。通过字重、颜色和间距建立层级。

5. **悬停效果限制**：`MouseRegion` / `InkWell` 的悬停反馈必须通过 `ThemeData.hoverColor` 统一控制。Flutter Web 和桌面端需避免触屏设备上的粘滞悬停。

6. **动效降级**：在 `MaterialApp` 中通过 `builder` 检测 `AccessibilityFeatures.reduceMotion`，禁用非必要 `AnimationController` 和 `AnimatedWidget`。关键过渡使用 `AnimationController` 控制持续时间，不写死固定时长 300ms。

7. **圆角规则**：所有容器 Widget（Card、Container、ElevatedButton、TextField、Dialog 等）必须有明确的 `BorderRadius` 声明，不允许无定义或依赖默认值。圆角取值（包括 `BorderRadius.zero`）必须与产品语气的形状策略一致：直角适合工业感、精密工具或编辑式排版；微圆角适合内容产品和工作界面；较大圆角适合消费品牌和创意展示。但同一页面的圆角不可混杂多种层级，必须归入 2-3 个语义等级。圆角应通过 `ThemeData.cardTheme.shape` 和 `ThemeData.dialogTheme.shape` 统一管理。

8. **浮层动效**：Dialog、BottomSheet、PopupMenu、Tooltip 等必须使用 Flutter 内置的过渡动画（`showDialog` 的 `transitionBuilder`、`AnimatedSize`、`SlideTransition` 等）。进入动画时长 `200ms–300ms`，退出动画 `150ms–200ms`。不允许无过渡的瞬间显示/隐藏，也不允许退出时长为 0。

9. **过渡品质（新增）**：所有 `MouseRegion`、`InkWell`、`GestureDetector` 的 hover/press 反馈必须使用 `AnimationController` 或 `AnimatedContainer` 控制平滑过渡，时长 `150ms–200ms`。不允许无过渡的瞬间状态跳变。

## 风格推力

以下规则推动输出达到现代界面的视觉活力。不满足将判定为视觉平庸，要求重新设计。

1. **非标准布局**：至少一个主要区块使用非标准排列方式（不对称分割、`Stack` 重叠分层、`CustomMultiChildLayout` 自由排列、`SliverList` 异形滚动）。不允许全部页面都是标准 `Column` + `Row` 堆叠。

2. **字体组合**：使用至少两种字体角色（衬线 + 无衬线 或 显示体 + 正文）。在 `TextTheme` 中配置不同 `fontFamily`。不允许全文只用同一字体。

3. **字号层级**：页面中至少有三个可辨识的字号层级（如 `TextTheme` 的 `bodySmall` / `bodyLarge` / `headlineSmall`）。不允许所有文字集中在两个字号内。

4. **颜色面积**：品牌色或强调色必须出现在至少一个大于 200 逻辑像素见方的视觉区域（`Container` 色块、背景、大标题等）。不允许品牌色只用于小按钮和 `TextSpan`。

5. **微交互**：至少一个交互元素有非平凡的状态变化（`AnimatedContainer` 渐变动画、`TweenAnimationBuilder` 数值过渡、`Hero` 共享元素转场、`AnimatedList` 列表动效）。不允许所有交互都是简单 `Opacity` 或 `Container` 颜色变化。

6. **间距节奏**：区块间距必须至少使用两种不同的值交替（如 32 和 64）。不允许所有区段间距完全相等。

7. **非卡片表达**：至少一个主要内容区块不使用标准 `Card` 或 `Material` 容器。使用 `Container` 背景色、`SizedBox` 留白、`Divider` 分割、`ClipRRect` 图片分区等替代方式建立内容分组。

## 5 秒自检输出项

当检测到 Flutter 平台时，在 SKILL.md 要求的自检结果中追加以下项目：

```
☐ ThemeData 定义了所有语义颜色
☐ 无超过 22 的 fontSize 值
☐ 自定义 ScrollbarTheme
☐ 使用 LayoutBuilder / MediaQuery 处理窄屏
☐ Card/Container/Button 均有明确 BorderRadius（含 0）
☐ 浮层使用了过渡动画
☐ reduceMotion 在应用级别处理
☐ 至少一个非标准布局（Stack / 不对称等）
☐ 至少两种字体角色
☐ 至少三个字号层级
☐ 品牌色出现在 > 200px² 区域
☐ 有微交互（AnimatedContainer / Hero 等，duration 150–200ms）
☐ 浮层有进入+退出动画（transitionBuilder 控制）
☐ 至少一个非 Card 分区方式
```

## 样式规范

- 优先使用 `Theme.of(context)` 和 `ThemeData` 派生所有颜色和文字样式，不创建游离的 `TextStyle` / `Color` 常量。
- 使用 `SizedBox`、`Padding`、`Spacer` 和 `EdgeInsets` 建立一致的间距节奏（4/8/12/16/24/32/48px）。
- 纯装饰元素添加 `semanticsLabel: ""` 和 `excludeFromSemantics: true`。
- 使用 `Icon` 和预编译的 `IconData`，不混用 Emoji 和自定义绘制图形。
- 列表使用 `ListView.builder` 或 `GridView.builder`，不使用 `ListView(children: [...])` 渲染长列表。
- 考虑 Material 和 Cupertino 两种风格的选择依据：根据平台选择对应组件，或使用 `ThemeData(platform: ...)` 统一风格。
