# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 p5.js 的个人作品集网站,展示了 Andy 的个人信息和创意交互项目。项目使用纯前端技术栈,无需构建步骤,可直接在浏览器中运行。

## 运行项目

直接在浏览器中打开 `index.html` 即可启动项目。建议使用本地服务器(如 Live Server)以避免跨域问题:

```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server
```

然后访问 `http://localhost:8000/index.html`

## 架构结构

### 主项目结构(根目录)

#### 页面导航流程
- `index.html` - 欢迎页面,带有交互式背景动画(sketcha.js)
- `home.html` - 主导航页面,提供四个页面的入口
- `about.html` - 个人介绍页面,展示三个重要物品的故事
- `piano.html` - 交互式钢琴应用
- `camera.html` - 魔法相机特效应用

#### JavaScript 文件功能
- **sketcha.js**: 欢迎页面的交互式网格渐变动画,鼠标移动时产生颜色渐变效果,点击改变渐变紧密度
- **sketch.js**: About 页面的浮动照片背景动画,使用 Perlin 噪声实现自然漂浮效果
- **about.js**: 管理 About 页面的内容切换逻辑,通过三个函数 `showBrush()`, `showRacket()`, `showMic()` 依次展示个人故事
- **piano.js**: 实现交互式钢琴,使用 p5.sound 的振荡器和包络生成音符(C4-C5 音阶)
- **camera.js**: 实现实时视频特效,将摄像头画面转换为像素化方块效果,方块大小根据亮度变化

#### 资源文件
图片资源 (a0.png - a6.jpg) 用于 About 页面的照片展示和故事叙述。

### 背景效果示例(bg1-bg3 目录)

项目包含三个独立的背景效果示例,每个都是独立的 p5.js 应用:

- **bg1/**: 使用 p5.brush 库的流场绘画效果
  - 依赖 `p5.brush.min.js` 扩展库
  - 实现自动生成的艺术流线效果
  - 使用自定义画布管理对象 `C` 处理响应式布局
  - 支持 WEBGL 渲染模式

- **bg2/**: 交互式发光笔刷绘画
  - 鼠标拖拽绘制带有粒子效果的曲线
  - 点击产生爆发式粒子效果
  - 使用青色(cyan)粒子和紫色背景

- **bg3/**: 鼠标跟随的网格渐变动画
  - 与根目录的 `sketcha.js` 功能相同
  - 点击改变渐变紧密度参数

这些示例可作为背景效果的备选方案或学习参考。

### p5.js 集成模式

项目使用两种方式加载 p5.js:
1. **CDN 方式** (about.html, piano.html, camera.html, bg1-bg3):
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
   ```

2. **本地文件** (index.html):
   - `p5.js` - 核心库
   - `p5.sound.min.js` - 音频扩展

## 开发注意事项

### p5.js 画布管理
- 每个页面只能有一个 p5.js sketch 实例
- 使用 `canvas.parent()` 将画布附加到特定 DOM 元素
- About 页面的画布设置为 `z-index: -1` 作为背景层

### 音频交互
- piano.js 需要用户交互才能启动音频上下文 (`userStartAudio()`)
- 使用 `p5.Oscillator` 和 `p5.Envelope` 生成合成音效

### 摄像头权限
- camera.html 需要浏览器摄像头权限
- 使用 `createCapture(VIDEO)` 访问摄像头
- 设置 `{flipped:true}` 实现镜像效果

### 响应式设计
- 所有 p5.js sketch 都实现了 `windowResized()` 函数以适应窗口大小变化
- camera.js 使用 `windowWidth` 和固定宽高比 (4:3) 创建画布
- bg1 使用自定义画布管理对象 `C`,通过检测横竖屏自动调整画布尺寸

### p5.brush 扩展库(仅 bg1)
- bg1 使用 `p5.brush.min.js` 实现艺术笔刷效果
- 支持多种笔刷类型和流场(flowfield)效果
- 使用 `brush.field("seabed")` 激活海床流场
- 使用 `brush.flowLine()` 绘制沿流场的线条
