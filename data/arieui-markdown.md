# 快速开始

## 简介

<h4>AriesUI 是乐刻大前端团队和乐刻 UED 团队基于统一的规范实现的、完整的、符合企业级要求、开箱即用的 UI 组件库。通过 AriesUI 以优雅高效的方式将设计和研发从重复劳动中解放出来，快速搭建出风格统一的页面，更好的贴近业务需求。</h4>

## 安装

### 使用 npm 安装

```bash
npm i @lefit/aries-ui
```

### 使用 pnpm 安装

```bash
pnpm i @lefit/aries-ui
```

## 使用

AriesUI 提供了两种方式使用组件，具体使用方式如下

### 按需引入（推荐）

借助 Vite 等支持 tree-shaking 特性的构建工具，按需引入可以达到减少打包体积的效果。

```vue
<template>
  <ArButton type="primary">按钮</ArButton>
</template>

<script setup lang="ts">
import { ArButton } from '@lefit/aries-ui'
</script>
```

### 全局注册（不推荐）

使用全局注册不利于组件使用数据的收集

```js
import { createApp } from 'vue'
import Aries from '@lefit/aries-ui'
import App from './app.vue'

createApp(App).use(Aries).mount('#root')
```

<!-- RAG SPLIT -->

# 主题与全局变量

## 配置方式

### 1. 按需引入

如果您是按需引入的组件库，可通过下述方式配置主题

1. 在 `main.ts` 中引入 `useTheme` 方法配置主题

```js
import { useTheme } from '@lefit/aries-ui'

useTheme('Member')
createApp(app).mount('#app')
```

2. 支持条件判断实现主题切换

```js
import { isCoachApp, isLefitApp } from '@lefit/fe-env'
import { useTheme } from '@lefit/aries-ui'

if (isCoachApp()) {
  useTheme('Coach')
} else if (isLefitApp()) {
  useTheme('Member')
}
createApp(app).mount('#app')
```

### 2. 全局注册

1. 在 `main.ts` 中全局安装时配置

```js
import Aries from '@lefit/aries-ui'

createApp(app).use(Aries, { theme: 'Member' }).mount('#app')
```

## 全局变量

主题依托 css 变量实现，分为基础全局变量与主题全局变量.
<br />
全局变量均配置在 `:root` 中，主题切换通过设置 html 的 theme 属性对应 `:root[theme="xxx"]` 的方式实现.

### 基础变量

| 名称                      | 默认值  | 描述             |
| ------------------------- | ------- | ---------------- |
| 中性色                    |
| --le-color-important-text | #2a2a2d | 重要信息         |
| --le-color-normal-text    | #534f63 | 正文文本、小标题 |
| --le-color-secondary-text | #aba7b6 | 次级辅助文案     |
| --le-color-weak-text      | #d0cfd3 | 弱文案           |
| --le-color-disabled       | #e9e8ec | 禁用             |
| --le-color-global-bg      | #f5f6fa | 全局背景色       |
| --le-color-white          | #ffffff | 白色，辅助色     |
| 部分字体颜色              |
| --le-font-color-white     | #ffffff | 白色字体颜色     |
| --le-font-color-black     | #333333 | 黑色字体颜色     |
| --le-font-color-success   | #00c22c | 成功状态字体颜色 |
| --le-font-color-error     | #ff5a20 | 失败状态字体颜色 |
| --le-font-color-warning   | #ff9b00 | 告警状态字体颜色 |
| 卡片圆角                  |
| --le-card-border-radius   | 24px    | 卡片类型圆角     |

### 主题变量

#### Member 主题

配置在 `:root[theme="Member"] `中

| 名称                             | 默认值  | 描述         |
| -------------------------------- | ------- | ------------ |
| --le-theme-color                 | #ff5a20 | 主题色       |
| --le-theme-light-color           | #ffece5 | 主题浅色 10% |
| 按钮圆角与内边距                 |
| --le-button-large-border-radius  | 48px    |              |
| --le-button-medium-border-radius | 48px    |              |
| --le-button-small-border-radius  | 48px    |              |
| --le-button-mini-border-radius   | 48px    |              |
| --le-button-tiny-border-radius   | 48px    |              |
| --le-button-large-padding        | 0 120px |              |
| --le-button-medium-padding       | 0 40px  |              |
| --le-button-small-padding        | 0 32px  |              |
| --le-button-mini-padding         | 0 24px  |              |
| --le-button-tiny-padding         | 0 12px  |              |
| 其他组件圆角                     |
| --le-toast-border-radius         | 16px    |              |
| --le-popup-border-radius         | 16px    |              |
| --le-dialog-border-radius        | 24px    |              |
| --le-dialog-image-border-radius  | 16px    |              |
| --le-dialog-input-border-radius  | 24px    |              |
| --le-popover-border-radius       | 16px    |              |
| --le-search-border-radius        | 36px    |              |

#### Coach 主题

配置在 `:root[theme="Coach"] `中

| 名称                             | 默认值  | 描述         |
| -------------------------------- | ------- | ------------ |
| --le-theme-color                 | #1751FA | 主题色       |
| --le-theme-light-color           | #E7EDFE | 主题浅色 10% |
| 按钮圆角与内边距                 |
| --le-button-large-border-radius  | 16px    |              |
| --le-button-medium-border-radius | 8px     |              |
| --le-button-small-border-radius  | 8px     |              |
| --le-button-mini-border-radius   | 8px     |              |
| --le-button-tiny-border-radius   | 4px     |              |
| --le-button-large-padding        | 0 120px |              |
| --le-button-medium-padding       | 0 32px  |              |
| --le-button-small-padding        | 0 24px  |              |
| --le-button-mini-padding         | 0 16px  |              |
| --le-button-tiny-padding         | 0 8px   |              |
| 其他组件圆角                     |
| --le-toast-border-radius         | 16px    |              |
| --le-popup-border-radius         | 16px;   |              |
| --le-dialog-border-radius        | 24px    |              |
| --le-dialog-image-border-radius  | 16px    |              |
| --le-dialog-input-border-radius  | 24px    |              |
| --le-popover-border-radius       | 16px    |              |
| --le-search-border-radius        | 36px    |              |

#### Merchant 主题

配置在 `:root[theme="Merchant"] `中

| 名称                             | 默认值  | 描述         |
| -------------------------------- | ------- | ------------ |
| --le-theme-color                 | #FF9B00 | 主题色       |
| --le-theme-light-color           | #FFF5E5 | 主题浅色 10% |
| 按钮圆角与内边距                 |
| --le-button-large-border-radius  | 16px    |              |
| --le-button-medium-border-radius | 8px     |              |
| --le-button-small-border-radius  | 8px     |              |
| --le-button-mini-border-radius   | 8px     |              |
| --le-button-tiny-border-radius   | 4px     |              |
| --le-button-large-padding        | 0 120px |              |
| --le-button-medium-padding       | 0 32px  |              |
| --le-button-small-padding        | 0 24px  |              |
| --le-button-mini-padding         | 0 16px  |              |
| --le-button-tiny-padding         | 0 8px   |              |
| 其他组件圆角                     |
| --le-button-border-radius        | 48px    |              |
| --le-toast-border-radius         | 16px    |              |
| --le-popup-border-radius         | 16px    |              |
| --le-dialog-border-radius        | 24px    |              |
| --le-dialog-image-border-radius  | 16px    |              |
| --le-dialog-input-border-radius  | 24px    |              |
| --le-popover-border-radius       | 16px    |              |
| --le-search-border-radius        | 36px    |              |

<!-- RAG SPLIT -->

# ArButton 按钮

## 描述信息（When to use）

按钮用于开启一个闭环的操作任务

## 使用示例（Examples）

### 组件类型

type 一共有四种基本类型，分别对应：默认的 primary、light、outline、text

```vue
<template>
  <div class="button-row">
    <ArButton type="primary">填充按钮</ArButton>
    <ArButton type="light">次级按钮</ArButton>
    <ArButton type="outline">描边按钮</ArButton>
  </div>
  <div class="button-row">
    <ArButton type="text">文字按钮</ArButton>
  </div>
</template>

<style lang="less" scoped>
.button-row {
  display: flex;
  padding: 0 32px;
  margin: 32px 0;

  button:not(:first-child) {
    margin-left: 32px;
  }
}
</style>
```

### 组件尺寸

size 共五种大小，从小到大分别对应：tiny、mini、small、默认的 medium、large

```vue
<template>
  <div class="button-row">
    <ArButton size="tiny">极小按钮</ArButton>
    <ArButton size="mini">迷你按钮</ArButton>
    <ArButton size="small">小按钮</ArButton>
    <ArButton size="medium">默认按钮</ArButton>
  </div>
  <div class="button-row">
    <ArButton size="large">大按钮</ArButton>
  </div>
</template>

<style lang="less" scoped>
.button-row {
  display: flex;
  align-items: flex-end;
  padding: 0 32px;
  margin: 32px 0;

  button:not(:first-child) {
    margin-left: 32px;
  }
}
</style>
```

### 圆角&加载中&块级&图标

circle 控制圆角显示，默认为 true；loading 状态不触发点击事件，默认为 false；block 控制按钮是否独占一行，默认为 false；左侧按钮图标可通过 iconSrc 配置，也可以通过 icon 插槽实现。

```vue
<template>
  <div class="button-row">
    <ArButton type="outline" :circle="false" @click="change">填充按钮</ArButton>
    <ArButton type="outline" @click="change">填充按钮</ArButton>
    <ArButton type="outline" loading @click="change">Loading</ArButton>
  </div>
  <div class="button-row">
    <ArButton icon-src="https://img.leoao.com/fe-invoice/customer_service.png" content="按钮" size="tiny"></ArButton>
    <ArButton icon-src="https://img.leoao.com/fe-invoice/customer_service.png" content="按钮" size="mini"></ArButton>
    <ArButton icon-src="https://img.leoao.com/fe-invoice/customer_service.png" content="按钮" size="small"></ArButton>
    <ArButton icon-src="https://img.leoao.com/fe-invoice/customer_service.png" content="按钮" size="medium"></ArButton>
  </div>

  <div class="button-row">
    <ArButton block icon-src="https://img.leoao.com/fe-invoice/customer_service.png" icon-align="right" @click="change"
      >填充按钮</ArButton
    >
  </div>
  <div class="button-row">
    <ArButton block content="客服按钮-icon插槽实现，同时文案过多了会单行溢出隐藏" @click="change">
      <template #icon><KefuIcon color="#fff" /></template>
    </ArButton>
  </div>
</template>

<script setup lang="ts">
import { KefuIcon } from '@lefit/aries-ui-icon'
const change = () => {
  alert('click')
}
</script>

<style lang="less" scoped>
.button-row {
  display: flex;
  align-items: flex-end;
  padding: 0 32px;
  margin: 32px 0;

  button:not(:first-child) {
    margin-left: 32px;
  }
}
</style>
```

### 禁用状态

```vue
<template>
  <div class="button-row">
    <ArButton disabled type="primary">填充按钮</ArButton>
    <ArButton disabled type="light">填充按钮</ArButton>
    <ArButton disabled type="outline">填充按钮</ArButton>
  </div>
  <div class="button-row">
    <ArButton disabled type="text">填充按钮</ArButton>
  </div>
</template>
<style lang="less" scoped>
.button-row {
  display: flex;
  padding: 0 32px;
  margin: 32px 0;

  button:not(:first-child) {
    margin-left: 32px;
  }
}
</style>
```

## API

### ArButton Props

| 名称      | 类型                                                                 | 默认值    | 说明                                                                                                                                   | 必传 |
| --------- | -------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| block     | boolean                                                              | `false`   | 是否为块级元素                                                                                                                         | N    |
| disabled  | boolean                                                              | `false`   | 禁用状态                                                                                                                               | N    |
| circle    | boolean                                                              | `true`    | 按钮圆角                                                                                                                               | N    |
| size      | `large ` &#124; `medium` &#124; `small` &#124; `mini` &#124; ` tiny` | `medium`  | 尺寸，对应设计稿`750`尺寸<p>`large h-96px`</p> <p>`medium h-80px`</p> <p>`small h-56px`</p> <p>`mini h-48px`</p> <p>`tiny h-32px `</p> | N    |
| type      | `outline ` &#124; `primary` &#124; `text` &#124; ` light`            | `primary` | 按钮类型                                                                                                                               | N    |
| iconSrc   | string                                                               | -         | 按钮图标地址                                                                                                                           | N    |
| iconAlign | `left ` &#124; ` right`                                              | `left`    | 按钮图标位置                                                                                                                           | N    |
| content   | string                                                               | -         | 按钮文字内容                                                                                                                           | N    |
| loading   | boolean                                                              | `false`   | 按钮执行中，不可点击                                                                                                                   | N    |
| width     | string                                                               | -         | 按钮长度                                                                                                                               | N    |

### ArButton Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| click | `(e: MouseEvent)` | 点击时触发 |

### ArButton Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |
| icon    | 图标插槽     |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                      | 默认值                        | 描述                             |
| ----------------------------------------- | ----------------------------- | -------------------------------- |
| --le-button-primary-bg-color              | `var(--le-theme-color)`       | primary 按钮背景色，可使用渐变色 |
| --le-button-primary-color                 | `var(--le-font-color-white)`  | 按钮字体色                       |
| --le-button-primary-disabled-bg-color     | `var(--le-theme-light-color)` | 禁用时背景色                     |
| --le-button-primary-disabled-color        | `var(--le-font-color-white)`  | 禁用时字体色                     |
| --le-button-outline-bg-color              | #fff                          |                                  |
| --le-button-outline-border-color          | `var(--le-theme-color)`       |                                  |
| --le-button-outline-color                 | `var(--le-theme-color)`       |                                  |
| --le-button-outline-disabled-border-color | `var(--le-color-weak-text)`   |                                  |
| --le-button-outline-disabled-color        | `var(--le-color-weak-text)`   |                                  |
| --le-button-light-bg-color                | `var(--le-theme-light-color)` |                                  |
| --le-button-light-color                   | `var(--le-theme-color)`       |                                  |
| --le-button-light-disabled-bg-color       | `var(--le-color-disabled)`    |                                  |
| --le-button-light-disabled-color          | `var(--le-font-color-white)`  |                                  |
| --le-button-text-color                    | `var(--le-theme-color)`       |                                  |
| --le-button-text-disabled-color           | `var(--le-color-weak-text)`   |                                  |
| --le-button-text-padding                  | 10px                          |                                  |
| --le-button-large-width                   | 520px                         | large 按钮固定宽度               |
| --le-button-large-height                  | 96px                          | 按钮高度                         |
| --le-button-medium-height                 | 80px                          |                                  |
| --le-button-small-height                  | 56px                          |                                  |
| --le-button-mini-height                   | 48px                          |                                  |
| --le-button-tiny-height                   | 32px                          |                                  |
| --le-button-large-font-size               | 32px                          | 文字大小                         |
| --le-button-medium-font-size              | 28px                          |                                  |
| --le-button-small-font-size               | 24px                          |                                  |
| --le-button-mini-font-size                | 22px                          |                                  |
| --le-button-tiny-font-size                | 20px                          |                                  |
| --le-button-large-icon-size               | 40px                          | 图标大小                         |
| --le-button-medium-icon-size              | 40px                          |                                  |
| --le-button-small-icon-size               | 32px                          |                                  |
| --le-button-mini-icon-size                | 24px                          |                                  |
| --le-button-tiny-icon-size                | 24px                          |                                  |
| --le-button-large-icon-gap                | 16px                          | 图标与文字的间距                 |
| --le-button-medium-icon-gap               | 8px                           |                                  |
| --le-button-small-icon-gap                | 8px                           |                                  |
| --le-button-mini-icon-gap                 | 8px                           |                                  |
| --le-button-tiny-icon-gap                 | 4px                           |                                  |
| --le-button-font-weight                   | 500                           | 文字粗细                         |

<!-- RAG SPLIT -->

# ArDivider 分割线

## 描述信息（When to use）

用于分割、组织、细化有一定逻辑的组织元素内容和页面结构

## 使用示例（Examples）

### 粗细与虚线

gap 可设置分割线的垂直方向外边距；dashed 用于设置分割线是否为虚线；borderWidth 设置分割线粗细

```vue
<template>
  <div class="divider-row">
    <ArDivider gap="0.48rem" />
    <ArDivider dashed gap="0.48rem" />
    <ArDivider border-width="0.04rem" />
  </div>
</template>
```

### 垂直分割线

vertical 控制分割线是否为垂直线，
垂直分割线需要父组件有明确高度或自身通过 style 设置高度才可显示，若需居中则建议使用 flex 布局

```vue
<template>
  <div class="divider-row">
    <div class="vertical">
      <span>苹果</span>
      <ArDivider vertical gap="0.2rem" class="demo-divider" />
      <span>香蕉</span>
      <ArDivider vertical gap="0.2rem" class="demo-divider" />
      <span>桃子</span>
      <ArDivider vertical gap="0.2rem" class="demo-divider" />
      <span>笨蛋</span>
    </div>
  </div>
</template>
```

### 更多自定义

color 可设置分割线的颜色

```vue
<template>
  <div class="divider-row">
    <ArDivider color="red" dashed />
    <ArDivider border-width="0.04rem" color="red" :style="{ width: '5rem' }" gap="0.4rem" />
  </div>
  <div class="divider-row">
    <div class="vertical">
      <span>苹果</span>
      <ArDivider vertical gap="0.2rem" border-width="0.02rem" color="green" height="0.24rem" />
      <span>香蕉</span>
      <ArDivider vertical gap="0.2rem" border-width="0.02rem" color="blue" height="0.44rem" />
      <span>桃子</span>
      <ArDivider vertical gap="0.2rem" border-width="0.02rem" color="black" />
      <span>笨蛋</span>
    </div>
  </div>
</template>
```

## API

### ArDivider Props

| 名称        | 类型    | 默认值                     | 说明                                 | 必传 |
| ----------- | ------- | -------------------------- | ------------------------------------ | ---- |
| dashed      | boolean | `false`                    | 是否为虚线                           | N    |
| vertical    | boolean | `false`                    | 方向垂直                             | N    |
| gap         | string  | `0px`                      | 分隔间距                             | N    |
| color       | string  | `var(--le-color-disabled)` | 颜色                                 | N    |
| borderWidth | string  | `1px`                      | 粗细                                 | N    |
| height      | string  | -                          | 垂直状态下的高度，默认跟随父容器高度 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称               | 默认值                     | 描述 |
| ------------------ | -------------------------- | ---- |
| --le-divider-color | `var(--le-color-disabled)` | 颜色 |
| --le-divider-width | 1px                        | 粗细 |

<!-- RAG SPLIT -->

# ArFab 悬浮按钮

## 描述信息（When to use）

当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布

## 使用示例（Examples）

### 基本使用

可通过 iconSrc 属性或默认插槽设置图标；offset 设置悬浮按钮的定位

```vue
<template>
  <ArFab icon-src="https://res.leoao.com/xiaoxiao/意向.png" @click="handler" />
  <ArFab :offset="{ right: '0.4rem', top: '2.4rem' }" @click="handler">
    <EvaluateIcon color="#fff" size="0.4rem" />
  </ArFab>
  <ArFab
    icon-src="https://img.leoao.com/coach/jiankangshaicha.png"
    :offset="{ left: '0.4rem', bottom: '1.2rem' }"
    :button-props="{ disabled: true }"
    @click="handler"
  />
</template>

<script setup lang="ts">
import { EvaluateIcon } from '@lefit/aries-ui-icon'
const handler = () => alert('click')
</script>
```

## API

### ArFab Props

| 名称        | 类型                                                               | 默认值                          | 说明                   | 必传 |
| ----------- | ------------------------------------------------------------------ | ------------------------------- | ---------------------- | ---- |
| iconSrc     | string                                                             | -                               | 图标地址               | N    |
| offset      | `{ bottom?: string; right?: string; left?: string; top?: string }` | `{ bottom: 80px, right: 40px }` | 定位                   | N    |
| buttonProps | `Partial<ButtonProps>`                                             | -                               | 透传至 button 的 props | N    |

### ArFab Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| click | `(e: MouseEvent)` | 点击时触发 |

### ArFab Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称               | 默认值 | 描述                 |
| ------------------ | ------ | -------------------- |
| --le-fab-size      | 98px   | 按钮尺寸             |
| --le-fab-icon-size | 40px   | icon 尺寸            |
| --le-fab-right     | 40px   | 默认离屏幕右边的距离 |
| --le-fab-bottom    | 80px   | 默认离屏幕底部的距离 |
| --le-fab-zIndex    | 700    | 悬浮按钮层级         |

<!-- RAG SPLIT -->

# ArCell 单元格

## 描述信息（When to use）

用于各个类别行的信息展示

## 使用示例（Examples）

### 基本用法

```vue
<template>
  <div class="cell-wrap">
    <ArCellGroup>
      <ArCell title="单行标题" arrow />
      <ArCell title="单行标题" :badge-props="{ dot: true }" arrow />
      <ArCell title="单行标题" :badge-props="{ content: '28' }" arrow />
      <ArCell title="单行标题" description="辅助文案辅助文案辅助文案" arrow required />

      <ArCell title="单行标题" description="辅助文案辅助文案辅助文案" note="辅助说明" arrow></ArCell>
      <ArCell
        title="单行标题"
        title-width="1.4rem"
        note="辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明辅助说明"
      />
      <ArCell
        title="多行标题吧啦吧啦吧啦多行标题吧啦吧啦吧啦多行标题吧啦吧啦吧啦多行标题吧啦吧啦吧啦"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案"
        note="辅助说明"
        note-width="2.8rem"
      >
      </ArCell>
    </ArCellGroup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.cell-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

### 拓展用法

```vue
<template>
  <div class="cell-wrap">
    <ArCellGroup>
      <ArCell title="单行标题">
        <template #right>
          <ArSwitch v-model="text" size="small"></ArSwitch>
        </template>
      </ArCell>
      <ArCell title="带图标" arrow>
        <template #left>
          <PictureIcon color="var(--le-theme-color)" size="0.48rem" />
        </template>
      </ArCell>
      <ArCell title="带图标" description="描述文案描述文案描述文案" arrow>
        <template #left>
          <PictureIcon color="var(--le-theme-color)" size="0.72rem" />
        </template>
      </ArCell>
      <ArCell title="带图片/头像" image="https://img.leoao.com///mini.jpeg" description="描述文案描述文案描述文案">
        <template #right>
          <ArButton type="primary" size="mini" :style="{ width: '1.18rem' }">领取</ArButton>
        </template>
      </ArCell>
    </ArCellGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PictureIcon } from '@lefit/aries-ui-icon'
const text = ref(true)
</script>

<style lang="less" scoped>
.cell-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

### 卡片样式

```vue
<template>
  <div class="cell-wrap">
    <ArCellGroup type="card">
      <ArCell title="单行标题" arrow />
      <ArCell title="单行标题" arrow required />
      <ArCell title="单行标题">
        <template #right>
          <ArSwitch v-model="text" size="small"></ArSwitch>
        </template>
      </ArCell>
      <ArCell title="单行标题" description="辅助文案辅助文案辅助文案" note="辅助说明" arrow></ArCell>
      <ArCell title="带图标" arrow>
        <template #left>
          <PictureIcon color="var(--le-theme-color)" size="0.48rem" />
        </template>
      </ArCell>
    </ArCellGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PictureIcon } from '@lefit/aries-ui-icon'
const text = ref(true)
</script>

<style lang="less" scoped>
.cell-wrap {
  padding: 40px 24px;
  background-color: #efefef;
}
</style>
```

### 使用案例

```vue
<template>
  <div class="cell-wrap">
    <ArCellGroup>
      <ArCell title="新人见面礼" image="https://img.leoao.com/le-ui/1711099236577_36u596wi6yy.png">
        <template #right>
          <ArButton type="primary" size="mini" :style="{ width: '1.18rem' }">领取</ArButton>
        </template>
        <template #description>
          <div class="cell-desc">
            <span>500乐刻豆，每个门店限领1次</span>
            <WarningIcon color="var(--le-theme-color)" @click="alertDialog" />
          </div>
        </template>
      </ArCell>
      <ArCell title="新人见面礼" image="https://img.leoao.com/le-ui/1711099236577_36u596wi6yy.png">
        <template #right>
          <ArButton type="primary" size="mini" :style="{ width: '1.18rem' }">领取</ArButton>
        </template>
        <template #description>
          <div class="cell-desc">
            <span>500乐刻豆，每个门店限领1次, 点击图标弹窗</span>
          </div>
        </template>
        <template #bottom>
          <div class="demo-bottom">tip：500乐刻豆，每个门店限领1次500乐刻豆</div>
        </template>
      </ArCell>
      <ArCell title="新人见面礼" image="https://img.leoao.com/le-ui/1711099236577_36u596wi6yy.png">
        <template #right>
          <ArButton type="primary" size="mini" :style="{ width: '1.18rem' }">领取</ArButton>
        </template>
        <template #description>
          <div class="cell-desc">
            <span>500乐刻豆，每个门店限领1次500乐刻豆，每个门店限领1次500乐刻豆，每个门店限领1次</span>
          </div>
        </template>
        <template #bottom>
          <div class="demo-bottom">tip：500乐刻豆，每个门店限领1次500乐刻豆</div>
        </template>
      </ArCell>
    </ArCellGroup>
  </div>
</template>

<script setup lang="ts">
import { WarningIcon } from '@lefit/aries-ui-icon'
import { useDialog } from '@/dialog'
const dialog = useDialog()
const alertDialog = () => dialog.alert('点击触发弹窗')
</script>

<style lang="less" scoped>
.cell-wrap {
  padding: 40px 0;
  background-color: #efefef;
}

.cell-desc {
  svg {
    margin-left: 4px;
  }
}

.demo-bottom {
  font-size: 22px;
  color: #555;
  text-align: right;
}
</style>
```

## API

### ArCell Props

| 名称        | 类型                  | 默认值  | 说明                 | 必传 |
| ----------- | --------------------- | ------- | -------------------- | ---- |
| image       | string                | -       | 主图, 图片地址       | N    |
| title       | string                | -       | 标题                 | N    |
| arrow       | boolean               | `false` | 显示右箭头           | N    |
| required    | boolean               | -       | 是否显示表单必填星号 | N    |
| description | string                | -       | 下方内容描述         | N    |
| note        | string                | -       | 位于右侧的说明文字   | N    |
| titleWidth  | string                | -       | 标题宽度             | N    |
| noteWidth   | string                | -       | note 区域宽度        | N    |
| badgeProps  | `Partial<BadgeProps>` | -       | 配置位于右侧的徽标   | N    |

### ArCell Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| click | `(e: MouseEvent)` | 点击时触发 |

### ArCell Slots

| 名称        | 描述         |
| ----------- | ------------ |
| left        | 左侧插槽     |
| description | 描述插槽     |
| note        | 说明内容插槽 |
| right       | 右侧插槽     |
| bottom      | 底部插槽     |

### ArCellGroup Props

| 名称 | 类型                    | 默认值    | 说明     | 必传 |
| ---- | ----------------------- | --------- | -------- | ---- |
| type | `default` &#124; `card` | `default` | 展示类型 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                            | 默认值                           | 描述                             |
| ------------------------------- | -------------------------------- | -------------------------------- |
| --le-cell-horizontal-padding    | 24px                             | 水平内边距                       |
| --le-cell-vertical-padding      | 28px                             | 垂直内边距                       |
| --le-cell-left-gap              | 16px                             | 左侧图标图片与内容的间距         |
| --le-cell-image-size            | 80px                             | 单元格图片尺寸                   |
| --le-cell-title-font-size       | 32px                             | 标题文字大小                     |
| --le-cell-title-color           | `var(--le-color-important-text)` | 标题文字颜色                     |
| --le-cell-description-gap       | 12px                             | 描述文字与表题的间距             |
| --le-cell-description-font-size | 28px                             | 描述文字大小                     |
| --le-cell-description-color     | `var(--le-color-secondary-text)` | 描述文字颜色                     |
| --le-cell-note-font-size        | 28px                             | 辅助文字大小                     |
| --le-cell-note-color            | `var(--le-color-secondary-text)` | 辅助文字颜色                     |
| --le-cell-right-font-size       | 32px                             | 右侧插槽内容文字大小右侧图标大小 |
| --le-cell-right-gap             | 16px                             | 右侧插槽内容图标与左侧内容的间距 |
| --le-cell-group-divider-color   | `var(--le-color-disabled)`       | cell-group 中分隔线颜色          |
| --le-cell-bg-color              | #fff                             | 单元格背景颜色                   |
| --le-cell-border-radius         | `var(--le-card-border-radius)`   | 卡片圆角                         |

<!-- RAG SPLIT -->

# ArSpace 间距

## 描述信息（When to use）

设置元素之间的间距

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="space-wrap">
    <ArSpace>
      <ArButton>Hello</ArButton>
      <ArButton>Hello</ArButton>
      <ArButton>Hello</ArButton>
      <ArButton>Hello</ArButton>
    </ArSpace>
  </div>

  <div class="space-wrap">自动换行</div>

  <div class="space-wrap">
    <ArSpace wrap>
      <ArButton v-for="(_, index) in new Array(8)" :key="index">Hello</ArButton>
    </ArSpace>
  </div>

  <div class="space-wrap">垂直方向</div>

  <div class="space-wrap">
    <ArSpace direction="column" fill>
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import ArSpace from '../index'
</script>

<style lang="less" scoped>
.space-wrap {
  padding: 24px;
}
</style>
```

### 更多用法

```vue
<template>
  <div class="space-wrap">
    <strong>1. Direction:</strong>
    <ArRadioGroup v-model="direction">
      <ArRadio class="radio" :block="false" placement="left" label="row" value="row" />
      <ArRadio class="radio" :block="false" placement="left" label="column" value="column" />
    </ArRadioGroup>
    <strong>2. Justify-content:</strong>
    <ArRadioGroup v-model="justify">
      <ArRadio class="radio" :block="false" placement="left" label="normal" value="normal" />
      <ArRadio class="radio" :block="false" placement="left" label="flex-start" value="flex-start" />
      <ArRadio class="radio" :block="false" placement="left" label="center" value="center" />
      <ArRadio class="radio" :block="false" placement="left" label="flex-end" value="flex-end" />
    </ArRadioGroup>
    <strong>3. Align-items:</strong>
    <ArRadioGroup v-model="align">
      <ArRadio class="radio" :block="false" placement="left" label="normal" value="normal" />
      <ArRadio class="radio" :block="false" placement="left" label="flex-start" value="flex-start" />
      <ArRadio class="radio" :block="false" placement="left" label="center" value="center" />
      <ArRadio class="radio" :block="false" placement="left" label="flex-end" value="flex-end" />
    </ArRadioGroup>
    <strong>3. Gap:</strong>
    <ArStepper v-model="gap" :step="5" :style="{ padding: '12px 0' }" allow-input></ArStepper>
  </div>

  <div class="space-wrap">
    <ArSpace :gap="`${gap}px`" :align="align" :justify="justify" :direction="direction" fill class="space">
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
      <ArButton block>Hello</ArButton>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArSpace from '../index'

const direction = ref<'row' | 'column'>('row')
const justify = ref('normal')
const align = ref('normal')
const gap = ref(20)
</script>

<style lang="less" scoped>
.space-wrap {
  padding: 0 24px;

  .le-radio {
    padding: 12px;
  }
  .space {
    height: 460px;
    background-color: #ccc;
    flex-wrap: wrap;
  }
}
</style>
```

## API

### ArSpace Props

| 名称      | 类型                             | 默认值    | 说明                                            | 必传 |
| --------- | -------------------------------- | --------- | ----------------------------------------------- | ---- |
| gap       | string                           | `0.16rem` | 间距 gap                                        | N    |
| direction | `row ` &#124; ` column`          | `row`     | 轴方向,同 flex-direction                        | N    |
| wrap      | boolean                          | `false`   | 自动换行                                        | N    |
| justify   | `CSSProperties[justify-content]` | -         | 轴方向对齐方式,同 justify-content               | N    |
| align     | `CSSProperties[align-items]`     | -         | 垂直轴方向对齐方式,同 align-items               | N    |
| fill      | boolean                          | -         | 是否让 ArSpace 变为一个块级元素，填充整个父元素 | N    |

### ArSpace Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称           | 默认值 | 描述 |
| -------------- | ------ | ---- |
| --le-space-gap | 16px   | 间距 |

<!-- RAG SPLIT -->

# ArSticky 吸顶容器

## 描述信息（When to use）

用于常驻页面顶部的信息、操作展示

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="sticky-wrap">
    <ArSticky :offset-top="50">
      <ArSpace justify="flex-start" fill>
        <ArButton>距屏幕顶部50px</ArButton>
      </ArSpace>
    </ArSticky>
  </div>
  <div ref="container" class="sticky-wrap container-wrap">
    <div style="height: 100vh">
      <ArSticky :container="container">
        <ArSpace justify="flex-start" fill>
          <ArButton>距容器顶部0px</ArButton>
        </ArSpace>
      </ArSticky>

      <ArSticky :container="container" :offset-top="50" @scroll="scrollHandler">
        <ArSpace justify="flex-end" fill>
          <ArButton>距容器顶部50px</ArButton>
        </ArSpace>
      </ArSticky>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const container = ref()
const scrollHandler = (scrollTop: number, fixed: boolean) => {
  console.log(scrollTop, fixed)
}
</script>

<style lang="less" scoped>
.sticky-wrap {
  margin: 24px;
  background-color: #ccc;
  height: 60vh;
  button {
    margin-bottom: 200px;
  }
}

.container-wrap {
  overflow-y: scroll;
}
</style>
```

## API

### ArSticky Props

| 名称      | 类型                       | 默认值 | 说明                         | 必传 |
| --------- | -------------------------- | ------ | ---------------------------- | ---- |
| container | `Element`                  | -      | 指定容器对应的外部容器       | N    |
| offsetTop | `string ` &#124; ` number` | `0`    | 吸顶时与顶部的距离，单位`px` | N    |
| zIndex    | number                     | `800`  | 吸顶时的 z-index             | N    |

### ArSticky Events

| 名称   | 参数                                    | 描述       |
| ------ | --------------------------------------- | ---------- |
| scroll | `({scrollTop: number, fixed: boolean})` | 滚动时触发 |

### ArSticky Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArTabs 选项卡

## 描述信息（When to use）

用于内容分类后的展示切换

## 使用示例（Examples）

### 居中布局

space-equal 为 true 时 tabs 居中布局，但注意仅适用于少量 tab 时使用

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <ArTabs space-equal :list="tabList" @change="change"> </ArTabs>
    </div>

    <div class="tabs-row">
      <ArTabs default-value="2" space-equal @change="change">
        <ArTabPanel v-for="item in ['1', '2', '3']" :key="item" :value="item" :label="`选项${item}`" />
      </ArTabs>
    </div>

    <div class="tabs-row">
      <ArTabs :value="current" space-equal @change="change">
        <ArTabPanel v-for="item in ['1', '2', '3', '4']" :key="item" :value="item" :label="`选项${item}`" />
      </ArTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref('1')
const tabList = ref([
  {
    label: '选项1',
    value: '1'
  },
  {
    label: '选项2',
    value: '2'
  }
])
const change = (val: string) => {
  console.log('change', val)
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}
</style>
```

### 居左对齐

默认情况下 space-equal 为 false，为居左对齐；bottomLineMode 可用于控制选项底部光标显示方式

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <ArTabs @change="change">
        <ArTabPanel v-for="item in ['1', '2']" :key="item" :value="item" :label="`选项${item}`" />
      </ArTabs>
    </div>
    <div class="tabs-row">
      <ArTabs v-model="current" @change="change">
        <ArTabPanel v-for="item in ['1', '2', '3']" :key="item" :value="item" :label="`选项${item}`" />
      </ArTabs>
    </div>

    <div class="tabs-row">
      <ArTabs @change="change">
        <ArTabPanel
          v-for="item in ['1', '2', '3', '4', '5', '6', '7']"
          :key="item"
          :value="item"
          :label="`选项${item}`"
        />
      </ArTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref('1')
const change = (val: string) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}
</style>
```

### 胶囊 Tabs

type 为 capsule 时间距较小，且不展示底部光标

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <ArTabs type="capsule" space-equal @change="change">
        <ArTabPanel v-for="item in ['1', '2', '3']" :key="item" :value="item" :label="`选项${item}`" />
      </ArTabs>
    </div>
    <div class="tabs-row">
      <ArTabs v-model="current" type="capsule" @change="change">
        <ArTabPanel
          v-for="item in ['1', '2', '3', '4', '5', '6', '7']"
          :key="item"
          :value="item"
          :label="`选项${item}`"
        />
      </ArTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref('1')
const change = (val: string) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}
</style>
```

### 联动 tabs

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <ArTabs v-model="complexValue[0]" @change="complexChange">
        <ArTabPanel v-for="item in complexData" :key="item.value" :label="item.label" :value="item.value"> </ArTabPanel>
      </ArTabs>
      <ArTabs v-model="complexValue[1]" class="sub-tabs">
        <ArTabPanel v-for="item in subData" :key="item.value" :label="item.label" :value="item.value"> </ArTabPanel>
      </ArTabs>
      <div style="margin: 10px">
        <p style="margin: 10px 0">complexValue：{{ complexValue }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'

const complexValue = reactive<string[]>([])
const complexData = reactive(
  new Array(3).fill(1).map((_, index) => ({
    label: `一级Tab${index + 1}`,
    value: `${index}`,
    children: new Array(8).fill(1).map((_, _index) => ({
      label: `二级${index + 1}-${_index + 1}`,
      value: `${index}-${_index}`
    }))
  }))
)
const subData = computed(() => {
  return complexData.find((item) => item.value === complexValue[0])?.children || []
})

const complexChange = (val: string) => {
  complexValue[1] = (complexData.find((item) => item.value === val)?.children || [])[0]?.value
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}

.sub-tabs {
  --le-tabs-plain-font-size: 28px;
}
</style>
```

### 禁用部分选项

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <div class="tips">选项1禁用</div>
      <ArTabs @change="change">
        <ArTabPanel
          v-for="item in ['1', '2']"
          :key="item"
          :value="item"
          :label="`选项${item}`"
          :disabled="item === '1'"
        />
      </ArTabs>
    </div>
    <div class="tips">选项2禁用</div>
    <div class="tabs-row">
      <ArTabs v-model="current" @change="change">
        <ArTabPanel
          v-for="item in ['1', '2', '3']"
          :key="item"
          :value="item"
          :label="`选项${item}`"
          :disabled="item === '2'"
        />
      </ArTabs>
    </div>
    <div class="tips">选项1、2、4禁用</div>
    <div class="tabs-row">
      <ArTabs @change="change">
        <ArTabPanel
          v-for="item in ['1', '2', '3', '4', '5', '6', '7']"
          :key="item"
          :value="item"
          :label="`选项${item}`"
          :disabled="['1', '2', '4'].includes(item)"
        />
      </ArTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref('1')
const change = (val: string) => {
  // console.log(val)
}
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}

.tips {
  margin: 12px 24px;
}
</style>
```

### 自定义组件

default 插槽暴露参数 `{isActive: boolean}`，表示当前选项是否为选中状态

```vue
<template>
  <div class="tabs-wrap">
    <div class="tabs-row">
      <ArTabs v-model="current" :style="{ height: '1.2rem' }" @change="change">
        <ArTabPanel v-for="item in tabList" :key="item" :value="item">
          <img :src="item" style="height: 0.8rem" />
        </ArTabPanel>
      </ArTabs>
      <div style="margin: 10px">
        <p style="margin: 10px 0">current: {{ current }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

const tabList = reactive<any[]>([])
const current = ref('')

onMounted(() => {
  setTimeout(() => {
    tabList.push(
      'https://img.leoao.com/ow/rumours5.png',
      'https://img.leoao.com/ow/rumors4.png',
      'https://img.leoao.com/ow/rumors3.png',
      'https://img.leoao.com/ow/rumors2.jpg',
      'https://img.leoao.com/ow/test.jpg'
    )
    Promise.all(
      tabList.map(
        (item) =>
          new Promise((r, j) => {
            const img = new Image()
            img.src = item
            img.onload = () => r(img)
            img.onerror = () => j(new Error('Failed to load image'))
          })
      )
    ).then(() => (current.value = tabList?.[4]))
  }, 2000)
})
</script>

<style lang="less" scoped>
.tabs-wrap {
  background-color: #eee;
  overflow: hidden;
}

.tabs-row {
  margin: 20px 0;
}

.active,
.no-active {
  width: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  text-align: center;
  color: #aba7b6;
  font-size: 20px;
  .date {
    font-size: 28px;
  }
}

.active {
  color: #333333;
  font-weight: 600;
  font-size: 20px;

  .date {
    font-size: 36px;
  }
}
</style>
```

## API

### ArTabs Props

| 名称           | 类型                                  | 默认值           | 说明                                                                                                 | 必传 |
| -------------- | ------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------- | ---- |
| type           | `plain ` &#124; ` capsule`            | `plain`          | tab 类型：纯文字、胶囊                                                                               | N    |
| list           | `Array<TTabItem>`                     | -                | 列表数组。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/tabs/types.ts) | N    |
| value          | `string ` &#124; ` number`            | `默认选中第一个` | 值,支持 v-model                                                                                      | N    |
| defaultValue   | `string ` &#124; ` number`            | -                | 默认值                                                                                               | N    |
| spaceEqual     | boolean                               | `false`          | 是否均分布局，false 为等间距布局                                                                     | N    |
| showBottomLine | boolean                               | `true`           | 是否展示底部激活线条                                                                                 | N    |
| bottomLineMode | `fixed ` &#124; `auto` &#124; ` full` | `fixed`          | 激活下划线的模式                                                                                     | N    |

### ArTabs Events

| 名称   | 参数                        | 描述       |
| ------ | --------------------------- | ---------- |
| change | `(value: string \| number)` | 变动时触发 |
| click  | `(value: string \| number)` | 点击时触发 |

### ArTabs Ref

| 名称   | 描述     |
| ------ | -------- |
| update | 刷新组件 |

### ArTabs Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### TabPanel Props

| 名称     | 类型    | 默认值 | 说明     | 必传 |
| -------- | ------- | ------ | -------- | ---- |
| label    | string  | -      | 文本     | N    |
| value    | string  | -      | 值       | Y    |
| disabled | boolean | false  | 是否禁用 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                | 默认值                           | 描述                      |
| ----------------------------------- | -------------------------------- | ------------------------- |
| --le-tabs-bg-color                  | `var(--le-color-white)`          | tabs 背景颜色             |
| --le-tabs-equal-padding             | 0 24px                           | 居中布局的 tabs 内边距    |
| --le-tabs-notequal-padding          | 0 0 0 24px                       | 非等分模式的 tabs 内边距  |
| --le-tabs-plain-height              | 80px                             | 纯文字 tabs 高度          |
| --le-tabs-plain-font-size           | 32px                             | 纯文字 tabs 字体大小      |
| --le-tabs-plain-font-weight         | 600                              | 纯文字 tabs 字体粗细      |
| --le-tabs-plain-color               | `var(--le-color-secondary-text)` | 文字颜色                  |
| --le-tabs-plain-active-color        | `var(--le-color-important-text)` | 选中文字颜色              |
| --le-tabs-plain-active-font-size    | 32px                             | 选中字体大小              |
| --le-tabs-capsule-height            | 112px                            | 胶囊 tabs 高度            |
| --le-tabs-capsule-border-radius     | 30px                             | 胶囊圆角                  |
| --le-tabs-capsule-padding           | 10px 32px                        | 胶囊内边距                |
| --le-tabs-capsule-font-size         | 28px                             | 胶囊文字大小              |
| --le-tabs-capsule-active-font-size  | 28px                             | 选中胶囊文字大小          |
| --le-tabs-capsule-font-weight       | 500                              | 胶囊文字粗细              |
| --le-tabs-capsule-color             | `var(--le-color-secondary-text)` | 文字颜色                  |
| --le-tabs-capsule-active-color      | `var(--le-color-white)`          | 选择文字颜色              |
| --le-tabs-capsule-bg-color          | `var(--le-color-global-bg)`      | 胶囊背景颜色              |
| --le-tabs-capsule-active-bg-color   | `var(--le-theme-color)`          | 选中胶囊背景颜色          |
| --le-tabs-plain-gap                 | 56px                             | 一般情况 item 之间的间距  |
| --le-tabs-capsule-gap               | 16px                             | 胶囊 item 之间的间距      |
| --le-tabs-bottom-line-bg-color      | `var(--le-theme-color)`          | 底部光标的背景色          |
| --le-tabs-bottom-line-height        | 6px                              | 底部光标的高度            |
| --le-tabs-bottom-line-border-radius | 3px                              | 底部光标的圆角            |
| --le-tabs-bottom-line-bottom        | 2px                              | 底部光标距离底部的距离    |
| --le-tabs-bottom-line-transition    | all 240ms 60ms                   | 底部光标的过渡效果        |
| --le-tabs-bottom-line-fixed-width   | 20px                             | 底部光标 fixed 状态下长度 |
| --le-tabs-item-transition           | all 300ms                        | tabItem 的过渡效果        |

<!-- RAG SPLIT -->

# ArTabBar 标签栏

## 描述信息（When to use）

用于在不同功能模块之间进行快速切换，位于页面底部

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <div class="tabbar-row">
    <ArTabBar v-model="currentIndex" :list="list" @change="change"></ArTabBar>
    <div style="margin: 10px">Page: {{ currentIndex }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = [
  {
    label: '选项1',
    value: '1',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  },
  {
    label: '选项2',
    value: '2',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  },
  {
    label: '选项3',
    value: '3',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  },
  {
    label: '选项4',
    value: '4',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  }
]
const currentIndex = ref(list[0]?.value)
const change = (val: string) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.tabbar-row {
  padding: 20px 0;
  background-color: #eee;
}
</style>
```

### 自定义

```vue
<template>
  <div class="tabbar-row">
    <div style="margin: 0 0 10px 10px">禁用选项1、4</div>
    <ArTabBar v-model="currentIndex" :list="list" @change="change"></ArTabBar>
    <div style="margin: 10px">Page: {{ currentIndex }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = [
  {
    label: '选项1',
    value: '1',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png',
    disabled: true
  },
  {
    label: '选项2',
    value: '2',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  },
  {
    label: '选项3',
    value: '3',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png'
  },
  {
    label: '选项4',
    value: '4',
    iconUrl: 'https://img.leoao.com/le-ui/1705384005345_p7kwquq9m3.png',
    activeIconUrl: 'https://img.leoao.com/le-ui/1705384017314_icf4ww4zgg.png',
    disabled: true
  }
]
const currentIndex = ref(list[2]?.value)
const change = (val: string) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.tabbar-row {
  padding: 20px 0;
  background-color: #eee;
}
</style>
```

## API

### TabBar Props

| 名称         | 类型                                                                              | 默认值 | 说明            | 必传 |
| ------------ | --------------------------------------------------------------------------------- | ------ | --------------- | ---- |
| list         | `TTabBarItemType[]`                                                               | -      | 配置列表        | N    |
| value        | string                                                                            | -      | 值,支持 v-model | N    |
| defaultValue | string                                                                            | -      | 默认值          | N    |
| badgeProps   | `Partial<BadgeProps> ` &#124; ` ((item: TTabBarItemType) => Partial<BadgeProps>)` | -      | 透传至徽标      | N    |

### TabBar Events

| 名称   | 参数              | 描述       |
| ------ | ----------------- | ---------- |
| change | `(value: string)` | 变化时触发 |

### TTabBarItemType

| 名称          | 类型    | 默认值 | 说明         | 必传 |
| ------------- | ------- | ------ | ------------ | ---- |
| label         | string  | -      | 文案         | N    |
| value         | string  | -      | 值           | N    |
| disabled      | boolean | false  | 是否禁用     | N    |
| iconUrl       | string  | -      | 默认状态图标 | N    |
| activeIconUrl | string  | -      | 选中状态图标 | N    |

### TabBar Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                           | 默认值                        | 描述                 |
| ------------------------------ | ----------------------------- | -------------------- |
| --le-tabbar-height             | 112px                         | 标签栏的高度         |
| --le-tabbar-icon-size          | 40px                          | 图标尺寸             |
| --le-tabbar-title-color        | `var(--le-color-normal-text)` | 标签文字颜色         |
| --le-tabbar-title-active-color | `var(--le-theme-color)`       | 标签文字激活状态颜色 |

<!-- RAG SPLIT -->

# ArSideBar 侧边栏

## 描述信息（When to use）

用于内容分类后的展示切换

## 使用示例（Examples）

### 基本使用

嵌套使用 ArSideBarItem 实现

```vue
<template>
  <div class="sidebar-wrap">
    <ArSideBar v-model="model">
      <ArSideBarItem
        v-for="item in sideList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :icon-src="item.iconSrc"
      ></ArSideBarItem>
    </ArSideBar>
    <div class="content">{{ model }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const model = ref('1')

const sideList = reactive([
  {
    label: '全身',
    value: '1'
  },
  {
    label: '肩膀',
    value: '2'
  },
  {
    label: '手臂',
    value: '3'
  },
  {
    label: '胸',
    value: '4',
    iconSrc: 'https://img.leoao.com/coach/jiankangshaicha.png'
  },
  {
    label: '背',
    value: '5'
  },
  {
    label: '腹',
    value: '6',
    iconSrc: 'https://img.leoao.com/coach/jiankangshaicha.png'
  },
  {
    label: '腰',
    value: '7'
  },
  {
    label: '臀',
    value: '8'
  },
  {
    label: '腿',
    value: '9'
  }
])
</script>

<style lang="less" scoped>
.sidebar-wrap {
  padding: 40px 0;
  height: 80vh;
  display: flex;

  .content {
    flex: 1;
    color: #fff;
    background-color: #444;
    padding: 80px;
    font-weight: 600;
    font-size: 264px;
  }
}
</style>
```

### 更多用法

disabled 表示禁用或无效状态；align 设置文字对齐方式，默认左对齐

```vue
<template>
  <div class="sidebar-wrap">
    <ArSideBar :value="current" @change="(val) => (current = val)">
      <ArSideBarItem v-for="item in sideList" :key="item.value" v-bind="item" align="center"></ArSideBarItem>
    </ArSideBar>
    <div class="content">{{ current }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const current = ref('2')

const sideList = reactive([
  {
    label: '全身',
    value: '1',
    disabled: true
  },
  {
    label: '肩膀',
    value: '2',
    disabled: true
  },
  {
    label: '手臂',
    value: '3',
    disabled: true
  },
  {
    label: '胸',
    value: '4',
    disabled: true
  },
  {
    label: '背',
    value: '5',
    disabled: true
  },
  {
    label: '腹',
    value: '6'
  },
  {
    label: '腰',
    value: '7'
  },
  {
    label: '臀',
    value: '8',
    iconSrc: 'https://img.leoao.com/coach/jiankangshaicha.png'
  },
  {
    label: '腿',
    value: '9',
    iconSrc: 'https://img.leoao.com/coach/jiankangshaicha.png'
  },
  {
    label: '全身',
    value: '11'
  },
  {
    label: '肩膀',
    value: '12'
  },
  {
    label: '手臂',
    value: '13'
  }
])
</script>

<style lang="less" scoped>
.sidebar-wrap {
  padding: 40px 0;
  height: 80vh;
  display: flex;

  .content {
    flex: 1;
    color: #fff;
    background-color: #444;
    padding: 80px;
    font-weight: 600;
    font-size: 264px;
  }
}
</style>
```

### 插槽

通过默认插槽定制 label 区域，插槽暴露 isActive 属性可用于自定义不同状态

```vue
<template>
  <div class="sidebar-wrap">
    <ArSideBar v-model="model">
      <ArSideBarItem
        v-for="item in sideList"
        :key="item.id"
        :value="item.id"
        :disabled="item.status === '已约满'"
        align="center"
      >
        <template #default="{ isActive }">
          <div class="time">
            <span style="font-family: DIN-Medium">{{ item.time }}</span>
            <span v-if="item.id !== '9'">{{ item.status }}</span>
            <span v-else :style="{ color: isActive ? 'red' : 'orange' }">惊喜大放送</span>
          </div>
        </template>
      </ArSideBarItem>
    </ArSideBar>
    <div class="content">{{ model }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const model = ref('1')

const sideList = reactive([
  {
    time: '7:00',
    status: '已约满',
    id: '1'
  },
  {
    time: '8:00',
    status: '已约满',
    id: '2'
  },
  {
    time: '9:00',
    status: '已约满',
    id: '3'
  },
  {
    time: '10:00',
    status: '已约满',
    id: '4'
  },
  {
    time: '11:00',
    status: '可约',
    id: '5'
  },
  {
    time: '12:00',
    status: '可约',
    id: '6'
  },
  {
    time: '13:00',
    status: '可约',
    id: '7'
  },
  {
    time: '14:00',
    status: '可约',
    id: '8'
  },
  {
    time: '15:00',
    status: '可约',
    id: '9'
  }
])
</script>

<style lang="less" scoped>
.sidebar-wrap {
  padding: 40px 0;
  height: 80vh;
  display: flex;

  .content {
    flex: 1;
    color: #fff;
    background-color: #444;
    padding: 80px;
    font-weight: 600;
    font-size: 264px;
  }
}

.time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
```

## API

### SideBar Props

| 名称            | 类型                       | 默认值 | 说明                 | 必传 |
| --------------- | -------------------------- | ------ | -------------------- | ---- |
| value           | `string ` &#124; ` number` | -      | 当前值, 支持 v-model | N    |
| defaultValue    | `string ` &#124; ` number` | -      | 默认值               | N    |
| showLine        | boolean                    | `true` | 展示光标             | N    |
| width           | string                     | -      | 侧边栏宽度           | N    |
| bottomGap       | string                     | -      | 底部间距             | N    |
| clickOnDisabled | boolean                    | `true` | diabled 装态下可点击 | N    |

### SideBar Events

| 名称   | 参数                                              | 描述       |
| ------ | ------------------------------------------------- | ---------- |
| change | `(value: string \| number, item: TSideItemProps)` | 改变时触发 |
| click  | `(value: string \| number, item: TSideItemProps)` | 点击时触发 |

### SideBar Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### SideBarItem Props

| 名称     | 类型                       | 默认值  | 说明           | 必传 |
| -------- | -------------------------- | ------- | -------------- | ---- |
| label    | string                     | -       | 展示文字       | N    |
| value    | `string ` &#124; ` number` | -       | 值             | N    |
| disabled | boolean                    | `false` | 是否为禁用状态 | N    |
| iconSrc  | string                     | -       | 图标地址       | N    |
| align    | `left ` &#124; ` center`   | `left`  | 文字对齐方式   | N    |

### SideBarItem Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 展示区域插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                 | 默认值                           | 描述                 |
| ------------------------------------ | -------------------------------- | -------------------- |
| --le-sidebar-bg-color                | `var(--le-color-global-bg)`      | 侧边栏背景色         |
| --le-sidebar-active-color            | #fff                             | 侧边栏激活项背景颜色 |
| --le-sidebar-width                   | 160px                            | 侧边栏宽度           |
| --le-sidebar-item-height             | 100px                            | 侧边栏 item 高度     |
| --le-sidebar-item-padding            | 0 0 0 32px                       | 侧边栏 item 内边距   |
| --le-sidebar-item-icon-gap           | 10px                             | 图标与文字距离       |
| --le-sidebar-item-color              | `var(--le-color-secondary-text)` | 未选中文字颜色       |
| --le-sidebar-item-font-size          | 24px                             | 字体大小             |
| --le-sidebar-item-font-weight        | 500                              | 未选中字体粗细       |
| --le-sidebar-active-item-color       | `var(--le-color-important-text)` | 选中时字体颜色       |
| --le-sidebar-active-item-font-weight | 600                              | 选中时字体粗细       |
| --le-sidebar-disabled-item-color     | `var(--le-color-weak-text)`      | 禁用时字体颜色       |
| --le-sidebar-item-border-radius      | 16px                             | 侧边栏 item 圆角     |
| --le-sidebar-icon-size               | 32px                             | 图标尺寸             |
| --le-sidebar-line-width              | 6px                              | 光标宽度             |
| --le-sidebar-line-height             | 32px                             | 光标高度             |
| --le-sidebar-line-padding-left       | 0px                              | 光标与左侧距离       |
| --le-sidebar-line-color              | `var(--le-theme-color)`          | 光标颜色             |
| --le-sidebar-line-border-radius      | 1px                              | 光标圆角             |

<!-- RAG SPLIT -->

# ArSteps 步骤条

## 描述信息（When to use）

用于任务步骤展示或任务进度展示

## 使用示例（Examples）

### 水平布局

layout 控制布局方式，默认水平布局，水平布局时配置 serialNumber 控制是否展示序号

```vue
<template>
  <div class="steps-wrap">
    <ArSteps :current="1">
      <ArStepItem title="选择意向"></ArStepItem>
      <ArStepItem title="教练接单"></ArStepItem>
      <ArStepItem title="完成约课"></ArStepItem>
    </ArSteps>
  </div>
  <div class="steps-wrap">
    <ArSteps serial-number :current="1">
      <ArStepItem title="选择意向"></ArStepItem>
      <ArStepItem title="教练接单"></ArStepItem>
      <ArStepItem title="完成约课"></ArStepItem>
      <ArStepItem title="评价反馈"></ArStepItem>
    </ArSteps>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.steps-wrap {
  margin: 40px 0;
}
</style>
```

### 垂直布局

```vue
<template>
  <div class="steps-wrap">
    <ArSteps :current="1" layout="vertical">
      <ArStepItem title="选择意向" :content="['退款申请已提交', '2021/12/20 12:00']"></ArStepItem>
      <ArStepItem title="教练接单" :content="['对方领取成功', '2021/12/20 12:30']"></ArStepItem>
      <ArStepItem title="完成约课" content="转课成功"></ArStepItem>
    </ArSteps>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.steps-wrap {
  margin: 40px;
}
</style>
```

### 善用插槽

插槽暴露一个 status 参数，值为 finish、process、default

```vue
<template>
  <div class="steps-wrap">
    <ArSteps :current="current" layout="vertical" @finish="finish" @change="change">
      <ArStepItem title="请看第一题">
        <template #default="{ status }">
          <ArButton block :disabled="status === 'finish'" @click="update(1)">{{
            status === 'finish' ? 'Good!' : '点击即可'
          }}</ArButton>
        </template>
      </ArStepItem>
      <ArStepItem title="再看第二题">
        <div class="test">
          <ArTextarea rows="2" title="写作" show-counter :max-length="100"></ArTextarea>
          <ArButton block class="btn" @click="update(2)">提交</ArButton>
        </div>
      </ArStepItem>
      <ArStepItem title="完成！！！" content="答题成功"></ArStepItem>
    </ArSteps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/toast'
const current = ref(0)
const update = (val: number) => (current.value = val)
const finish = () => useToast()('答题完成')
const change = (val: number) => console.log(val, 'change')
</script>

<style lang="less" scoped>
.steps-wrap {
  margin: 40px;
  --le-button-primary-bg-color: linear-gradient(to right, skyblue 0%, pink 100%);
}

.test {
  background-color: #ccc;
  border-radius: 16px;
  padding: 20px;

  .btn {
    margin-top: 20px;
  }
}
</style>
```

### verticalConfig 定制化

```vue
<template>
  <div class="steps-wrap">
    <ArSteps
      :current="1"
      layout="vertical"
      :vertical-config="{
        contentShowMode: 'always',
        stepLineType: 'dashed',
        stepAlign: 'top',
        LastStepLineMode: 'fade-out',
        distanceBetweenStepAndContent: '0.08rem'
      }"
    >
      <ArStepItem v-for="item in data" :key="item.id">
        <ClassInfo :item="item" />
      </ArStepItem>

      <template #stepCircle="{ status }">
        <div :class="`demo-custom-circle demo-custom-circle-${status}`">
          <span></span>
        </div>
      </template>
    </ArSteps>
  </div>

  <div style="background-color: #f5f6fa; padding: 0.24rem 0">
    <div class="steps-wrap">
      <ArSteps
        :current="1"
        layout="vertical"
        :vertical-config="{
          contentShowMode: 'always',
          stepLineType: 'dashed',
          stepAlign: 'center',
          distanceBetweenStepAndContent: '0.08rem',
          finishedStepLineColor: 'var(--le-theme-color)'
        }"
      >
        <ArStepItem v-for="item in todoList" :key="item.id" v-slot="{ status }">
          <TodoItem :status="status" :item="item"
        /></ArStepItem>

        <template #stepCircle="{ status, index }">
          <div :class="`demo-number-circle demo-number-circle-${status}`">
            <span>{{ index + 1 }}</span>
          </div>
        </template>
      </ArSteps>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ClassInfo from './components/ClassInfo.vue'
import TodoItem from './components/TodoItem.vue'

const data = ref<any[]>([])

const todoList = ref<any[]>([])

onMounted(() => {
  setTimeout(() => {
    data.value = [
      {
        id: 1,
        date: '6月23日',
        week: '周三',
        status: {
          color: '#ABA7B6',
          content: '已完成'
        },
        className: '胸部训练',
        time: '19:00-20:00',
        coach: '小鱼儿',
        body: '训练部位：胸部、腿部、背部'
      },
      {
        id: 2,
        date: '6月24日',
        week: '周四',
        status: {
          color: '#FF9B00',
          content: '待上课'
        },
        className: '胸部训练',
        time: '19:00-20:00',
        coach: '小鱼儿',
        body: '训练部位：胸部、腿部、背部'
      },
      {
        id: 3,
        date: '6月25日',
        week: '周五',
        status: {
          color: '#3E8FFF',
          content: '待预约'
        },
        className: '胸部训练',
        time: '19:00-20:00',
        coach: '小鱼儿',
        body: '训练部位：胸部、腿部、背部'
      }
    ]
    todoList.value = [
      { id: 1, title: '填写运动偏好', message: '为您匹配合适的教练和运动方案', option: '查看偏好' },
      { id: 2, title: '完成1节体验课', message: '填写意向即可为您安排课程', option: '查看详情' },
      { id: 3, title: '完成体测评估', message: '在乐刻门店体测仪进行体测', option: '去体测' },
      { id: 4, title: '和教练一同制订训练目标', message: '完成功能型评估，开启专属训练计划', option: '待确认' }
    ]
  }, 2000)
})
</script>

<style lang="less" scoped>
.steps-wrap {
  margin: 24px;
}

.demo-custom-circle {
  width: 24px;
  padding: 6px 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 4px solid #d0cfd6;
  }

  &-process {
    span {
      width: 12px;
      height: 12px;
      border: 6px solid var(--le-theme-color);
    }
  }
}

.demo-number-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--le-theme-color);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: 'DIN-Bold';
    font-size: 26px;
    color: #fff;
  }

  &-default {
    background-color: #d0cfd6;
  }
}
</style>
```

## API

### ArSteps Props

| 名称           | 类型                             | 默认值       | 说明         | 必传 |
| -------------- | -------------------------------- | ------------ | ------------ | ---- |
| layout         | `horizontal ` &#124; ` vertical` | `horizontal` | 布局方式     | N    |
| serialNumber   | boolean                          | `false`      | 带序号       | N    |
| current        | number                           | `0`          | 当前所处步骤 | N    |
| defaultCurrent | number                           | `0`          | 默认所处步骤 | N    |
| verticalConfig | `TVerticalConfigType`            | -            | 垂直布局配置 | N    |

### ArSteps Events

| 名称   | 参数            | 描述       |
| ------ | --------------- | ---------- |
| change | `(val: number)` | 变更时触发 |
| finish |                 | 完成时触发 |

### ArSteps Slots

| 名称       | 描述             |
| ---------- | ---------------- |
| default    | 默认内容插槽     |
| stepCircle | 左侧圆点替换插槽 |

### Step Item Props

| 名称    | 类型                   | 默认值 | 说明     | 必传 |
| ------- | ---------------------- | ------ | -------- | ---- |
| title   | string                 | -      | 标题     | N    |
| content | string &#124; string[] |        | 内容信息 | N    |

### TVerticalConfigType Props

| 名称                          | 类型                                     | 默认值    | 说明                                                                                 | 必传 |
| ----------------------------- | ---------------------------------------- | --------- | ------------------------------------------------------------------------------------ | ---- |
| distanceBetweenStepAndContent | string                                   | `0.14rem` | 步骤条与内容区域间距                                                                 | -    |
| distanceBetweenTwoContent     | string                                   | `0.32rem` | 每条内容的间距                                                                       | -    |
| stepAlign                     | `top` &#124; `center`                    | `top`     | 步骤条相对内容的位置                                                                 | -    |
| contentShowMode               | `active` &#124; `always`                 | `active`  | 步骤内容显示模式：active 为仅当已完成和进行中展示内容区域，always 表示无论何时都显示 | -    |
| stepLineType                  | `solid` &#124; `dashed`                  | `solid`   | 步骤间连线类型                                                                       | -    |
| LastStepLineMode              | `none` &#124; `normal` &#124; `fade-out` | `none`    | 最后一条步骤条连线显示方式                                                           | -    |
| finishedStepLineColor         | string                                   | -         | 已完成步骤的线条颜色                                                                 | -    |
| baseColor                     | string                                   | `#fff`    | 底色，用于组件与背景贴合                                                             | -    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                           | 默认值                      | 描述               |
| ------------------------------ | --------------------------- | ------------------ |
| --le-steps-vertical-line-color | `var(--le-color-weak-text)` | 垂直布局下线条颜色 |
| --le-steps-base-color          | #fff                        | 组件背景底色       |

<!-- RAG SPLIT -->

# ArNavbar 导航栏

## 描述信息（When to use）

用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="navbar-wrap">
    <ArSpace direction="column" gap="0.48rem">
      <ArNavbar left-arrow title="标题哈哈" @arrow-click="arrowClickHandler"> </ArNavbar>

      <ArNavbar left-arrow title="标题哈哈">
        <template #right><ShareIcon @click="shareHandler" /></template>
      </ArNavbar>

      <ArNavbar title="标题哈哈" style="font-weight: 600">
        <template #left><SuccessCheckedIcon /><span>啊哈</span></template>
        <template #right><AngleDownIcon /><span>文字</span></template>
      </ArNavbar>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { SuccessCheckedIcon, ShareIcon, AngleDownIcon } from '@lefit/aries-ui-icon'
const arrowClickHandler = () => {
  console.log('arrow click')
}
const shareHandler = () => {
  console.log('share click')
  // jsBridge
}
</script>

<style lang="less" scoped>
.navbar-wrap {
  display: flex;
  flex-direction: column;
}
</style>
```

### 固定在头部

```vue
<template>
  <div class="navbar-wrap">
    <ArSwitch v-model="fixed" style="margin-bottom: 0.24rem"></ArSwitch>
    <ArNavbar left-arrow title="点击开关切换Fixed状态" background="orange" :fixed="fixed"> </ArNavbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fixed = ref(false)
</script>

<style lang="less" scoped></style>
```

### 沉浸式导航栏

```vue
<template>
  <div class="navbar-wrap">
    <ArSwitch v-model="fixed" style="margin-bottom: 0.24rem"></ArSwitch>
    <ArNavbar
      left-arrow
      title="沉浸式导航栏"
      color="#333"
      background="#FFA501"
      :fixed="fixed"
      :immersion="{
        scrollContainer,
        initialColor: '#fff',
        finalColor: '#333',
        distance: 60,
        colorTransformDistance: 30
      }"
      :style="{ top: '1rem' }"
    >
    </ArNavbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const fixed = ref(false)
const scrollContainer = ref<Element>()

onMounted(() => {
  scrollContainer.value = document.querySelector('.tdesign-demo-main')!
})
</script>

<style lang="less" scoped></style>
```

## API

### ArNavbar Props

| 名称       | 类型                                  | 默认值  | 说明                   | 必传 |
| ---------- | ------------------------------------- | ------- | ---------------------- | ---- |
| title      | string                                | -       | 标题                   | N    |
| fixed      | boolean                               | `false` | 是否固定定位           | N    |
| leftArrow  | boolean                               | `false` | 展示左箭头             | N    |
| background | string                                | `#fff`  | 背景色,支持 hex 和 rgb | N    |
| immersion  | `boolean ` &#124; ` TImmersionConfig` | `false` | 沉浸式配置             | N    |

### TImmersionConfig

| 名称                   | 类型   | 默认值 | 说明                                | 必传 |
| ---------------------- | ------ | ------ | ----------------------------------- | ---- |
| scrollContainer        | string | -      | 滚动容器                            | N    |
| initialColor           | string | -      | 初始的文字颜色                      | N    |
| finalColor             | string | -      | 最终的文字颜色                      | N    |
| distance               | number | -      | 沉浸式滚动距离,默认为 navbar 的高度 | N    |
| colorTransformDistance | number | 30     | 滚动一定距离后文字颜色改变,单位 px  | N    |

### ArNavbar Events

| 名称       | 参数 | 描述             |
| ---------- | ---- | ---------------- |
| arrowClick |      | 点击左箭头时触发 |
| titleClick |      | 点击标题时触发   |

### ArNavbar Slots

| 名称  | 描述         |
| ----- | ------------ |
| title | 标题插槽     |
| left  | 左侧内容插槽 |
| right | 右侧内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                  | 默认值 | 描述     |
| --------------------- | ------ | -------- |
| --le-navbar-bg-color  | #fff   | 背景色   |
| --le-navbar-color     | #333   | 文字颜色 |
| --le-navbar-icon-size | 48px   | 图标尺寸 |

<!-- RAG SPLIT -->

# ArIndexes 索引

## 描述信息（When to use）

用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容

## 使用示例（Examples）

### 组件类型

结合 useScrollElementAnchors 实现

```vue
<template>
  <div class="container">
    <div v-for="item in data" :key="item.title" ref="wrapRef" class="wrap">
      <ArSticky offset-top="50">
        <div class="title">{{ item.title }}</div>
      </ArSticky>
      <div v-for="child in item.childrens" :key="child" class="child">{{ child }}</div>
    </div>
  </div>
  <ArIndexes v-model="current" :list="list" @click="clickHandler"></ArIndexes>
</template>

<script setup lang="ts">
import { useScrollElementAnchors } from '@/hooks'
import { ref } from 'vue'

const base = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const data = base.map((item) => {
  return {
    title: item,
    childrens: new Array(Math.floor(Math.random() * 15) + 5).fill(item).map((_, index) => `${item}-${index}`)
  }
})

const list = base.map((item, index) => ({ label: item, value: index }))

const current = ref(0)
const wrapRef = ref<HTMLElement[]>([])
const scrollHandler = (val: number | string) => (current.value = val as number)
const { scrollToTargetByKey } = useScrollElementAnchors(wrapRef, scrollHandler, 50)

const clickHandler = (val: number) => {
  scrollToTargetByKey(val, false)
}
</script>

<style lang="less" scoped>
.container {
  .title {
    padding: 0 24px;
    background-color: var(--le-theme-light-color);
    color: var(--le-theme-color);
  }
  .child {
    padding: 0 24px;
    height: 64px;
    line-height: 64px;
  }
}
</style>
```

## API

### ArIndexes Props

| 名称         | 类型                       | 默认值 | 说明            | 必传 |
| ------------ | -------------------------- | ------ | --------------- | ---- |
| list         | `TArIndexesListItem[]`     | `[]`   | 索引列表        | N    |
| value        | `string ` &#124; ` number` | -      | 值,支持 v-model | N    |
| defaultValue | `string ` &#124; ` number` | -      | 默认值          | N    |

### ArIndexes Events

| 名称   | 参数                      | 描述       |
| ------ | ------------------------- | ---------- |
| click  | `(val: number \| string)` | 点击时触发 |
| change | `(val: number \| string)` | 变更时触发 |

### TArIndexesListItem

| 名称  | 类型                       | 默认值 | 说明 | 必传 |
| ----- | -------------------------- | ------ | ---- | ---- |
| label | `string`                   | -      | 文案 | N    |
| value | `string ` &#124; ` number` | -      | 值   | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArPicker 选择器

## 描述信息（When to use）

用于一组预设数据中的选择

## 使用示例（Examples）

### 基本使用

columns 一般接受一个二维数组，外层数组长度表示 picker 列数，内层数组表示选项数

```vue
<template>
  <div class="picker-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArButton block @click="visible1 = true">单项选择</ArButton>
      <ArButton block @click="visible2 = true">三项选择</ArButton>
    </ArSpace>
  </div>

  <ArPopup v-model="visible1" placement="bottom" close-on-overlay-click>
    <ArPicker
      :default-value="['广州市的靓仔']"
      :columns="cityOptions"
      @cancel="cancelHandler1"
      @confirm="cityConfirmHandler"
    ></ArPicker>
  </ArPopup>

  <ArPopup v-model="visible2" placement="bottom" close-on-overlay-click>
    <ArPicker
      v-model="curValues"
      :columns="items"
      @cancel="cancelHandler2"
      @confirm="confirmHandler"
      @change="change"
    ></ArPicker>
  </ArPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)

const cities = [
  '北京市的靓仔',
  '上海市的靓仔',
  '广州市的靓仔',
  '深圳市的靓仔',
  '天津市的靓仔',
  '杭州市的靓仔',
  '南京市的靓仔',
  '成都市的靓仔',
  '重庆市的靓仔',
  '武汉市的靓仔',
  '西安市的靓仔',
  '长沙市的靓仔',
  '青岛市的靓仔',
  '大连市的靓仔',
  '宁波市的靓仔',
  '厦门市的靓仔',
  '苏州市的靓仔',
  '无锡市的靓仔',
  '郑州市的靓仔',
  '合肥市的靓仔'
]

const cityOptions = [cities.map((item) => ({ label: item, value: item }))]
const cancelHandler1 = () => (visible1.value = false)
const cityConfirmHandler = (val: string, context) => {
  console.log('confirm', val)
  visible1.value = false
}

const curValues = ref(['1', '2', '3'])
const items = ref([
  [
    { label: 'English', value: '1' },
    { label: 'Chinese', value: '2' },
    { label: 'Wuhu', value: '3' },
    { label: 'Qifei', value: '4' },
    { label: 'Energy', value: '5' },
    { label: 'GoodBoy', value: '6' }
  ],
  [
    { label: 'English', value: '1' },
    { label: 'Chinese', value: '2' },
    { label: 'Wuhu', value: '3' },
    { label: 'Qifei', value: '4' },
    { label: 'Energy', value: '5' },
    { label: 'GoodBoy', value: '6' }
  ],
  [
    { label: 'English', value: '1' },
    { label: 'Chinese', value: '2' },
    { label: 'Wuhu', value: '3' },
    { label: 'Qifei', value: '4' },
    { label: 'Energy', value: '5' },
    { label: 'GoodBoy', value: '6' }
  ]
])
const confirmHandler = (val, context) => {
  console.log('confirm', val)
  visible2.value = false
}
const cancelHandler2 = () => (visible2.value = false)

const change = (val, context) => {
  console.log('change', val, context)
}
</script>

<style lang="less" scoped>
.picker-row {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
</style>
```

### 级联选择

columns 的数组每一项为一个包含 children 属性的对象；fieldNames 可控制 label、value、children 的映射

```vue
<template>
  <div class="picker-row">
    <ArButton block @click="visible = true">级联选择</ArButton>
  </div>

  <ArPopup v-model="visible" placement="bottom" close-on-overlay-click>
    <ArPicker
      v-model="data"
      title="王者荣耀"
      :columns="roles"
      :field-names="{ label: 'name', value: 'val' }"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </ArPopup>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { PickerValue, PickerOption } from '../types'

const visible = ref(false)

const roles = reactive<PickerOption>([])

onMounted(() => {
  setTimeout(
    () =>
      roles.push(
        {
          name: '战士',
          val: '战士',
          children: [
            {
              name: '夏侯惇',
              val: '夏侯惇'
            },
            {
              name: '吕布',
              val: '吕布'
            },
            {
              name: '铠',
              val: '铠'
            },
            {
              name: '狂铁',
              val: '狂铁'
            }
          ]
        },
        {
          name: '法师',
          val: '法师',
          children: [
            {
              name: '安琪拉',
              val: '安琪拉'
            },
            {
              name: '扁鹊',
              val: '扁鹊'
            },
            {
              name: '不知火舞',
              val: '不知火舞'
            },
            {
              name: '嫦娥',
              val: '嫦娥'
            }
          ]
        }
      ),
    5000
  )
})

const data: any = ref(['法师', '扁鹊'])
const onChange = (value: PickerValue[], context: any) => {
  console.log('onChange', value)
}
const onConfirm = (value: PickerValue[], context: any) => {
  console.log('onConfirm', value)
  visible.value = false
}

const onCancel = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.picker-row {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
</style>
```

## API

### ArPicker Props

| 名称         | 类型                                                                                       | 默认值                                                   | 说明                                                                                                           | 必传 |
| ------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---- |
| cancelText   | string                                                                                     | `取消`                                                   | 取消按钮文字                                                                                                   | N    |
| confirmText  | string                                                                                     | `确定`                                                   | 确认按钮文字                                                                                                   | N    |
| title        | string                                                                                     | `标题`                                                   | 标题文字                                                                                                       | N    |
| columns      | `Array<ArPickerColumn> ` &#124; ` ((item: Array<ArPickerValue>) => Array<ArPickerColumn>)` | `[]`                                                     | 配置每一列的选项。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/picker/types.ts) | N    |
| fieldNames   | `ArPickerFieldNames`                                                                       | `{label: 'label', value: 'value', children: 'children'}` | 自定义字段名。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/picker/types.ts)     | N    |
| value        | `Array<ArPickerValue>`                                                                     | `[]`                                                     | 值，支持 v-model。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/picker/types.ts) | N    |
| defaultValue | `Array<ArPickerValue>`                                                                     | `[]`                                                     | 默认值。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/picker/types.ts)           | N    |

### ArPicker Events

| 名称    | 参数                                                               | 描述       |
| ------- | ------------------------------------------------------------------ | ---------- |
| change  | `(value: string[], options: ArPickerOption[] columnIndex: number)` | 变化时触发 |
| cancel  |                                                                    | 取消时触发 |
| confirm | `(value: string[], options: ArPickerOption[])`                     | 确认时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                         | 默认值                           | 描述         |
| ---------------------------- | -------------------------------- | ------------ |
| --le-picker-bg-color         | #fff                             | 背景颜色     |
| --le-picker-title-color      | `var(--le-color-important-text)` | 标题颜色     |
| --le-picker-cancel-color     | `var(--le-color-secondary-text)` | 取消字体颜色 |
| --le-picker-confirm-color    | `var(--le-theme-color)`          | 确定字体颜色 |
| --le-picker-item-color       | `var(--le-color-normal-text)`    | 选项字体颜色 |
| --le-picker-height           | 654px                            | 高度         |
| --le-picker-item-height      | 110px                            | 选项高度     |
| --le-picker-item-font-family | inherit                          | 选项字体     |

<!-- RAG SPLIT -->

# ArSearch 搜索框

## 描述信息（When to use）

用于用户输入搜索信息，并进行页面内容搜索

## 使用示例（Examples）

### 基本使用

disabled 设置是否禁用

```vue
<template>
  <div class="search-row">
    <ArSearch v-model="content" max-length="10" placeholder="搜索" allow-clear @submit="submitHandler" />
  </div>
  <div class="search-row">content: {{ content }}</div>
  <div class="search-row">
    <ArSearch placeholder="搜索" width="4rem" disabled @click="clickHandler" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/index'
import { ref } from 'vue'
const content = ref('')
const toast = useToast()

const clickHandler = () => {
  toast('禁止选中Input')
}

const submitHandler = (val: string) => {
  console.log('submit: ', val)
  toast('submit: ' + val)
}
</script>

<style lang="less" scoped>
.search-row {
  padding: 0 20px;
  margin: 20px 0;
}
</style>
```

## API

### ArSearch Props

| 名称         | 类型                       | 默认值  | 说明             | 必传 |
| ------------ | -------------------------- | ------- | ---------------- | ---- |
| placeholder  | string                     | -       | 占位符           | N    |
| disabled     | boolean                    | `false` | 不可输入         | N    |
| maxLength    | `string ` &#124; ` number` | -       | 最大内容长度     | N    |
| value        | string                     | -       | 值，支持 v-model | N    |
| defaultValue | string                     | -       | 默认值           | N    |
| width        | string                     | -       | 搜索框长度       | N    |
| allowClear   | boolean                    | `false` | 允许清空         | N    |

### ArSearch Events

| 名称   | 参数              | 描述                           |
| ------ | ----------------- | ------------------------------ |
| focus  | `(value: string)` | 聚焦时触发                     |
| blur   | `(value: string)` | 失焦时触发                     |
| change | `(value: string)` | 值改变时触发                   |
| submit | `(value: string)` | 提交时触发，如手机键盘提交事件 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                          | 默认值                           | 描述         |
| ----------------------------- | -------------------------------- | ------------ |
| --le-search-bg-color          | `var(--le-color-global-bg)`      | 背景颜色     |
| --le-search-color             | `var(--le-color-normal-text)`    | 字体颜色     |
| --le-search-placeholder-color | `var(--le-color-secondary-text)` | 占位符颜色   |
| --le-search-height            | 72px                             | 高度         |
| --le-search-icon-size         | 32px                             | 搜索图标尺寸 |
| --le-search-font-size         | 24px                             |              |
| --le-search-padding           | 24px                             |              |

<!-- RAG SPLIT -->

# ArSwitch 开关

## 描述信息（When to use）

用于控制某个功能的开启和关闭

## 使用示例（Examples）

### 尺寸大小

size 控制尺寸，medium(default)、small

```vue
<template>
  <div class="switch-wrap">
    <ArSpace gap="0.24rem">
      <ArSwitch v-model="open1" @change="(val) => console.log(val)"></ArSwitch>
      <ArSwitch v-model="open2" size="small"></ArSwitch>
      <ArSwitch v-model="open3" size="mini"></ArSwitch>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open1 = ref(true)
const open2 = ref(false)
const open3 = ref(false)
</script>

<style lang="less" scoped>
.switch-wrap {
  padding: 20px;
  display: flex;
}
</style>
```

### 禁用状态

禁用状态阻止状态改变

```vue
<template>
  <div class="switch-wrap">
    <ArSpace gap="0.24rem">
      <ArSwitch v-model="open1" disabled></ArSwitch>
      <ArSwitch v-model="open2" size="small" disabled></ArSwitch>
      <ArSwitch v-model="open3" size="mini" disabled></ArSwitch>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open1 = ref(true)
const open2 = ref(false)
const open3 = ref(false)
</script>

<style lang="less" scoped>
.switch-wrap {
  padding: 20px;
  display: flex;
}
</style>
```

## API

### ArSwitch Props

| 名称         | 类型                                    | 默认值     | 说明                                                                                       | 必传 |
| ------------ | --------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ | ---- |
| value        | boolean                                 | `false`    | 开启状态，支持 v-model                                                                     | N    |
| defaultValue | boolean                                 | `false`    | 默认状态                                                                                   | N    |
| size         | `medium ` &#124; `small` &#124; ` mini` | `'medium'` | 尺寸，对应设计稿`750`尺寸<p>`medium h-72px`</p> <p>`small h-56px`</p> <p>`mini h-36px`</p> | N    |
| disabled     | boolean                                 | `false`    | 禁用状态                                                                                   | N    |

### ArSwitch Events

| 名称   | 参数             | 描述       |
| ------ | ---------------- | ---------- |
| change | `(val: boolean)` | 变化时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                    | 默认值                        | 描述                   |
| --------------------------------------- | ----------------------------- | ---------------------- |
| --le-switch-bg-color                    | `var(--le-color-disabled)`    | 未激活背景颜色         |
| --le-switch-active-bg-color             | `var(--le-theme-color)`       | 激活背景颜色           |
| --le-swich-disabled-active-bg-color     | `var(--le-theme-light-color)` | 禁用激活状态背景颜色   |
| --le-switch-ball-color                  | #fff                          | 滚球颜色               |
| --le-swich-disabled-noactive-ball-color | rgba(255, 255, 255, 0.6)      | 禁用非激活状态滚球颜色 |
| --le-switch-medium-ball-size            | 64px                          | 默认滚球尺寸           |
| --le-switch-small-ball-size             | 48px                          | 小尺寸滚球尺寸         |
| --le-switch-mini-ball-size              | 32px                          | 迷你滚球尺寸           |
| --le-switch-medium-width                | 138px                         | 默认开关长度           |
| --le-switch-medium-height               | 72px                          | 默认开关高度           |
| --le-switch-small-width                 | 108px                         | 小尺寸开关长度         |
| --le-switch-small-height                | 56px                          | 小尺寸开关高度         |
| --le-switch-mini-width                  | 64px                          | 迷你尺寸开关长度       |
| --le-switch-mini-height                 | 36px                          | 迷你尺寸开关高度       |
| --le-switch-medium-border-radius        | 40px                          | 默认圆角               |
| --le-switch-small-border-radius         | 30px                          | 小尺寸圆角             |
| --le-switch-mini-border-radius          | 18px                          | 迷你圆角               |

<!-- RAG SPLIT -->

# ArCalendar 日历

## 描述信息（When to use）

按照日历形式展示数据或日期的容器

## 使用示例（Examples）

### 单选日历

type 为 single 时只可单选一个日期，返回一个所选日期的 `Date` 类型
<br/>
`mixDate` 可配置最小可选的日期，默认今天
<br/>
`maxDate` 最大可选的日期，默认半年后

```vue
<template>
  <div class="calendar-wrap">
    <ArButton block @click="single = true">Single单项</ArButton>
    {{ singleDate }}

    <ArPopup v-model="single" placement="bottom" close-on-overlay-click>
      <ArCalendar
        type="single"
        :value="singleDate"
        :min-date="new Date()"
        :max-date="new Date().getTime() + 86400000 * 30"
        @select="(val) => console.log(val)"
        @confirm="singleConfirm"
        @cancel="single = false"
      ></ArCalendar>
    </ArPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const single = ref()

const singleDate = ref()

const formatDate = (val: Date) => val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()

const cancel = () => {
  single.value = false
}

const singleConfirm = (val: Date) => {
  singleDate.value = formatDate(val)
  cancel()
}
</script>

<style lang="less" scoped>
.calendar-wrap {
  display: flex;
  padding: 20px;
  flex-direction: column;
}
</style>
```

### 多选日历

type 为 multiple 时可选多个日期，返回一个包含 `所选日期的数组`
<br/>
日历组件默认选择当天

```vue
<template>
  <div class="calendar-wrap">
    <ArButton block @click="multiple = true">multiple多选</ArButton>
    {{ formatDates(multipleData) }}

    <ArPopup v-model="multiple" placement="bottom" close-on-overlay-click>
      <ArCalendar
        v-model="multipleData"
        type="multiple"
        @select="(val) => console.log(val)"
        @confirm="multiple = false"
        @cancel="multiple = false"
      ></ArCalendar>
    </ArPopup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const multiple = ref()

const multipleData = reactive([new Date()])

const formatDate = (val: Date) => val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()

const formatDates = (val: Date[]) => (val ? val.map((item) => formatDate(item)).join('\n') : '')
</script>

<style lang="less" scoped>
.calendar-wrap {
  display: flex;
  padding: 20px;
  flex-direction: column;

  button {
    margin-bottom: 24px;
  }
}
</style>
```

### 范围日历

type 为 range 时可选日期区间，返回一个包含 `起始日期和结束日期的数组`
<br/>
日历组件默认选择当天

```vue
<template>
  <div class="calendar-wrap">
    <ArButton block @click="range = true">range范围选择</ArButton>
    {{ formatDates(rangeData) }}

    <ArPopup v-model="range" placement="bottom" close-on-overlay-click>
      <ArCalendar
        v-model="rangeData"
        first-day-of-week="0"
        type="range"
        :min-date="new Date('2024-05-01')"
        :max-date="new Date('2025-10-31')"
        :disabled-date="(val) => val < new Date().getTime()"
        @select="(val) => console.log(val)"
        @confirm="range = false"
        @cancel="range = false"
      ></ArCalendar>
    </ArPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const range = ref()

const rangeData = ref()

const formatDate = (val: Date) => val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()

const formatDates = (val: Date[]) => (val ? val.map((item) => formatDate(item)).join('\n') : '')
</script>

<style lang="less" scoped>
.calendar-wrap {
  display: flex;
  padding: 20px;
  flex-direction: column;
}
</style>
```

## API

### ArCalendar Props

| 名称           | 类型                                                          | 默认值     | 说明                                               | 必传 |
| -------------- | ------------------------------------------------------------- | ---------- | -------------------------------------------------- | ---- |
| title          | string                                                        | `选择日期` | 标题                                               | N    |
| confirmText    | string                                                        | `确认`     | 确认按钮文字                                       | N    |
| type           | `single ` &#124; `multiple` &#124; ` range`                   | `single`   | 选择类型                                           | N    |
| minDate        | `number ` &#124; ` Date`                                      | -          | 最小可选的日期，默认今天，可传时间戳和 Date 格式   | N    |
| maxDate        | `number ` &#124; ` Date`                                      | -          | 最大可选的日期，默认半年后，可传时间戳和 Date 格式 | N    |
| value          | `number ` &#124; `Date` &#124; `Array<number` &#124; ` Date>` | -          | 值，支持 v-model                                   | N    |
| defaultValue   | `number ` &#124; `Date` &#124; `Array<number` &#124; ` Date>` | -          | 默认值                                             | N    |
| firstDayOfWeek | `number ` &#124; ` string`                                    | `1`        | 每周的第一天，0 代表星期日，1 代表星期一           | N    |
| disabledDate   | `(date: number) => boolean`                                   | -          | 不可选择的日期                                     | N    |

### ArCalendar Events

| 名称    | 参数                    | 描述       |
| ------- | ----------------------- | ---------- |
| cancel  |                         | 关闭时触发 |
| select  | `(val: Date \| Date[])` | 选择时触发 |
| confirm | `(val: Date \| Date[])` | 确认时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                | 默认值                           | 描述                 |
| ----------------------------------- | -------------------------------- | -------------------- |
| --le-calendar-bg-color              | #fff                             | 背景色               |
| --le-calendar-title-color           | `var(--le-color-important-text)` | 标题色               |
| --le-calendar-today-color           | `var(--le-theme-color)`          | '今天'二字的颜色     |
| --le-calendar-disabled-color        | `var(--le-color-weak-text)`      | 禁用状态颜色         |
| --le-calendar-selected-bg-color     | `var(--le-theme-color)`          | 选中状态颜色         |
| --le-calendar-range-center-bg-color | `var(--le-theme-light-color)`    | 选中范围内的背景颜色 |
| --le-calendar-date-font-family      | 'DIN-Medium'                     | 日期字体类型         |

<!-- RAG SPLIT -->

# ArTextarea 文本域

## 描述信息（When to use）

用于多行文本信息输入

## 使用示例（Examples）

### 基础使用

title 设置标题； rows 设置默认行数&#10;showCounter 显示计数器，需与 maxLength 最大长度搭配使用

```vue
<template>
  <div class="textarea-wrap">
    <ArTextarea
      :value="message"
      title="看图写话："
      show-counter
      rows="3"
      placeholder="春眠不觉晓..."
      :max-length="100"
      @focus="focus"
      @blur="blur"
      @change="change"
    ></ArTextarea>
    <div class="message">{{ message }}</div>
  </div>
  <div class="textarea-wrap dark">
    <ArTextarea
      card
      background="#F7F8FC"
      :value="message"
      title="看图写话："
      show-counter
      rows="3"
      placeholder="春眠不觉晓..."
      :max-length="100"
    ></ArTextarea>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/toast'
const toast = useToast()

const message = ref('')
const focus = (val: string) => toast({ message: 'foucs: ' + val })
const blur = (val: string) => toast({ message: 'blur: ' + val })
const change = (val: string) => (message.value = val)
</script>

<style lang="less" scoped>
.textarea-wrap {
  padding: 24px 0;
  background-color: #efefef;

  .message {
    padding: 24px;
    box-sizing: border-box;
    word-break: break-all;
  }
}
.dark {
  padding: 24px;
  background-color: #fff;
}
</style>
```

### 自动增高

autosize 设置自动增高，此时 rows 设置最小行数

```vue
<template>
  <div class="textarea-wrap">
    <ArTextarea v-model="message" autosize rows="1" card></ArTextarea>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
</script>

<style lang="less" scoped>
.textarea-wrap {
  padding: 24px;
  background-color: #efefef;

  .message {
    padding: 24px;
    box-sizing: border-box;
    word-break: break-all;
  }
}
</style>
```

## API

### ArTextarea Props

| 名称         | 类型                       | 默认值       | 说明             | 必传 |
| ------------ | -------------------------- | ------------ | ---------------- | ---- |
| title        | string                     | -            | 标题             | N    |
| value        | string                     | -            | 值，支持 v-model | N    |
| defaultValue | string                     | -            | 默认值           | N    |
| rows         | `number ` &#124; ` string` | `2`          | 默认行数         | N    |
| autosize     | boolean                    | `false`      | 自动行数         | N    |
| placeholder  | string                     | `请输入文字` | 占位符           | N    |
| showCounter  | boolean                    | `false`      | 显示计数器       | N    |
| maxLength    | `number ` &#124; ` string` | -            | 最大长度         | N    |
| background   | string                     | `#fff`       | 背景色           | N    |
| card         | boolean                    | `false`      | 展示卡片类型     | N    |
| disabled     | boolean                    | `false`      | 是否禁用         | N    |
| readonly     | boolean                    | `false`      | 是否只读         | N    |

### ArTextarea Events

| 名称   | 参数           | 描述           |
| ------ | -------------- | -------------- |
| focus  | `(val:string)` | 聚焦时触发     |
| blur   | `(val:string)` | 失焦时触发     |
| change | `(val:string)` | 内容改变时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                              | 默认值                           | 描述           |
| --------------------------------- | -------------------------------- | -------------- |
| --le-textarea-bg-color            | #fff                             | 背景色         |
| --le-textarea-title-color         | `var(--le-color-important-text)` | 标题文字颜色   |
| --le-textarea-content-color       | `var(--le-color-normal-text)`    | 内容文字颜色   |
| --le-textarea-placeholder-color   | `var(--le-color-secondary-text)` | 占位符字体颜色 |
| --le-textarea-counter-color       | `var(--le-color-secondary-text)` | 计数器字体颜色 |
| --le-textarea-counter-font-family | 'DIN-Medium'                     | 计数器字体     |
| --le-textarea-border-radius       | `var(--le-card-border-radius)`   | 圆角           |

<!-- RAG SPLIT -->

# ArDatePicker 日期选择器

## 描述信息（When to use）

用于选择一个时间点或者一个时间段

## 使用示例（Examples）

### 年月日

start-end 选择时间范围，可以传递时间戳或字符串(如'2024-03-12'、'2024-03-12 17:28:45')
<br/>
format 用于 change、confirm 事件参数格式化
<br/>
mode: year = 年；month = 年月；date = 年月日；hour = 年月日时； minute = 年月日时分；当类型为数组时，第一个值控制年月日，第二个值控制时分秒。

```vue
<template>
  <ArDatePicker
    v-model="year"
    format="YYYY-MM-DD"
    mode="year"
    @change="change"
    @confirm="confirm"
    @cancel="cancel"
  ></ArDatePicker>

  <ArDatePicker
    v-model="month"
    format="YYYY-MM-DD"
    mode="month"
    @change="change"
    @confirm="confirm"
    @cancel="cancel"
  ></ArDatePicker>

  <ArDatePicker
    v-model="date"
    format="YYYY-MM-DD"
    mode="date"
    @change="change"
    @confirm="confirm"
    @cancel="cancel"
  ></ArDatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const year = ref('2024')
const month = ref('2024/04')
const date = ref(new Date().getTime())

const visible = ref(false)
const change = (val: string) => console.log('change', val)
const confirm = (val: string) => {
  visible.value = false
  console.log('confirm', val)
}
const cancel = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.datepicker-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>
```

### 时间

```vue
<template>
  <ArDatePicker
    v-model="time1"
    start="2024-03-08 18:00:00"
    end="2024-03-08 23:59:59"
    cancel-text="不选了"
    confirm-text="就是你了"
    format="HH:mm"
    :mode="['hour', 'minute']"
    @change="change"
    @confirm="confirm"
    @cancel="cancel"
  ></ArDatePicker>

  <ArDatePicker
    v-model="time2"
    start="2024-03-08 18:00:00"
    end="2024-03-14 23:59:59"
    format="YYYY-MM-DD HH:mm:ss"
    :mode="['date', 'second']"
    @change="change"
    @confirm="confirm"
    @cancel="cancel"
  ></ArDatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time1 = ref()
const time2 = ref()

const change = (val) => console.log('change', val)
const confirm = (val) => console.log('confirm', val)
const cancel = (val) => console.log('cancel', val)
</script>

<style lang="less" scoped></style>
```

## API

### DatePicker Props

| 名称         | 类型                       | 默认值                | 说明                                                                                                     | 必传 |
| ------------ | -------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------- | ---- |
| title        | string                     | `选择时间`            | 标题                                                                                                     | N    |
| start        | `string ` &#124; ` number` | `默认10年前`          | 最小时间                                                                                                 | N    |
| end          | `string ` &#124; ` number` | `默认10年后`          | 最大时间                                                                                                 | N    |
| mode         | `TMode ` &#124; ` TMode[]` | `date`                | 默认值。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/datepicker/types.ts) | N    |
| format       | string                     | `YYYY-MM-DD HH:mm:ss` | 用于 change、confirm 事件参数格式化                                                                      | N    |
| cancelText   | string                     | `取消`                | 取消按钮文字                                                                                             | N    |
| confirmText  | string                     | `确定`                | 确认按钮文字                                                                                             | N    |
| value        | `string ` &#124; ` number` | -                     | 当前值，支持 v-model                                                                                     | N    |
| defaultValue | `string ` &#124; ` number` | -                     | 默认值                                                                                                   | N    |

### DatePicker Events

| 名称    | 参数            | 描述       |
| ------- | --------------- | ---------- |
| change  | `(val: string)` | 变更时触发 |
| confirm | `(val: string)` | 确认时触发 |
| cancel  |                 | 取消时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArRadio 单选框

## 描述信息（When to use）

用于在预设的一组选项中执行单项选择，并呈现选择结果

## 使用示例（Examples）

### 通栏模式

当只有单个单选框建议直接使用 Radio, 有多个选项单选时建议使用 RadioGroup 包裹

```vue
<template>
  <div class="radio-wrap">
    <ArSpace direction="column" gap="0.24rem">
      <ArRadio :checked="single" label="单个使用" value="single" borderless @change="(val) => (single = val)" />

      <ArRadioGroup :options="options" @change="change"> </ArRadioGroup>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RadioProps } from '../index'
const single = ref(false)
const options = reactive<Partial<RadioProps>[]>([
  { label: '使用 RadioGroup 包裹一组单选', value: '1', placement: 'left' },
  {
    label: '通过 options 属性传入列表',
    value: '2',
    description: '描述文案描述文案描述文案描述文案。',
    placement: 'left'
  },
  { label: '标题文案', value: '3', description: '描述文案描述文案描述文案描述文案。', placement: 'left' },
  {
    label: '禁用文案',
    value: '4',
    description: '描述文案描述文案描述文案描述文案。',
    placement: 'left',
    disabled: true
  }
])
const change = (val: string) => console.log('change', val)
</script>

<style lang="less" scoped>
.radio-wrap {
  padding: 40px 0;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
}
</style>
```

### 卡片模式

卡片模式本身并不提供外边距，而需要外层或页面提供内边距实现
<br/>
卡片的 type 类型有 4 种：`default(默认) | card | gap-card | sub-gap-card`

```vue
<template>
  <div class="radio-wrap">
    <ArRadio value="1" label="单独使用Radio的卡片样式" borderless card />
  </div>

  <div class="radio-wrap">
    <ArRadioGroup :value="radioValue1" type="card" @change="change1">
      <ArRadio value="1" label="card大卡片样式" />
      <ArRadio value="2" label="标题文案" description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。" />
      <ArRadio
        value="3"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
      ></ArRadio>
    </ArRadioGroup>
  </div>

  <div class="radio-gap-wrap">
    <ArRadioGroup v-model="radioValue2" type="gap-card" @change="change">
      <ArRadio value="1" label="gap-card隔断卡片样式" />
      <ArRadio value="2" label="标题文案" description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。" />
      <ArRadio
        value="3"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
      ></ArRadio>
    </ArRadioGroup>
  </div>

  <div class="radio-sub-gap-wrap">
    <ArRadioGroup default-value="3" type="sub-gap-card" @change="change">
      <ArRadio value="1" label="sub-gap-card二级卡片样式" />
      <ArRadio value="2" label="一种罕见于弹窗中的单选框" />
      <ArRadio value="3" label="与一般单项框大小和颜色有差异"></ArRadio>
    </ArRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radioValue1 = ref('1')
const radioValue2 = ref('2')

const change1 = (val: string) => (radioValue1.value = val)
const change = (val: string) => console.log('change', val)
</script>

<style lang="less" scoped>
.radio-wrap {
  padding: 24px;
  background-color: #efefef;
}

.radio-gap-wrap {
  padding: 24px;
  background-color: #efefef;
}

.radio-sub-gap-wrap {
  padding: 24px;
}
</style>
```

### 横向布局

```vue
<template>
  <div class="radio-wrap">
    <ArRadioGroup class="box" default-value="1" @change="change">
      <ArRadio :block="false" value="1" label="单项选择" placement="left" />
      <ArRadio :block="false" value="2" label="单项选择" placement="left" />
      <ArRadio :block="false" value="3" label="单项选择" placement="left" />
    </ArRadioGroup>

    <ArRadioGroup class="box box1" type="card" default-value="1" @change="change">
      <ArRadio :block="false" value="1" label="唱" placement="left" />
      <ArRadio :block="false" value="2" label="跳" placement="left" />
      <ArRadio :block="false" value="3" label="Rap" placement="left"></ArRadio>
    </ArRadioGroup>
  </div>
</template>

<script setup lang="ts">
const change = (val: string) => console.log('change', val)
</script>

<style lang="less" scoped>
.box {
  display: flex;
  padding: 24px;
  background-color: #fff;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}

.box1 {
  margin: 0 24px;
}
.radio-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

### 禁用状态

```vue
<template>
  <div class="radio-wrap">
    <ArRadioGroup default-value="1" disabled @change="change">
      <ArRadio
        value="1"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
        placement="left"
        checked
      ></ArRadio>

      <ArRadio
        value="2"
        label="禁用不可选"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
        placement="left"
      ></ArRadio>
    </ArRadioGroup>
  </div>
</template>

<script setup lang="ts">
const change = (val: string) => console.log('change', val)
</script>

<style lang="less" scoped>
.radio-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

## API

### ArRadio Props

| 名称        | 类型                                        | 默认值  | 说明             | 必传 |
| ----------- | ------------------------------------------- | ------- | ---------------- | ---- |
| checked     | boolean                                     | `false` | 是否选中         | N    |
| label       | string                                      | -       | 标题             | N    |
| description | string                                      | -       | 描述文案         | N    |
| disabled    | boolean                                     | `false` | 禁用             | N    |
| value       | `string ` &#124; `number` &#124; ` boolean` | -       | 值               | N    |
| placement   | `left ` &#124; ` right`                     | `right` | 图标相对文案位置 | N    |
| card        | boolean                                     | `false` | 展示卡片样式     | N    |
| block       | boolean                                     | `true`  | 块级元素         | N    |
| borderless  | boolean                                     | `false` | 无边框样式       | N    |

### ArRadio Events

| 名称   | 参数             | 描述       |
| ------ | ---------------- | ---------- |
| change | `(val: boolean)` | 变更时触发 |

### ArRadioGroup Props

| 名称         | 类型                                                           | 默认值     | 说明                 | 必传 |
| ------------ | -------------------------------------------------------------- | ---------- | -------------------- | ---- |
| value        | `string ` &#124; `number`                                      | -          | 当前值，支持 v-model | N    |
| defaultValue | `string ` &#124; `number`                                      | -          | 默认值               | N    |
| options      | `Partial<TArRadioProps>[]`                                     | `default`  | 列表渲染             | N    |
| type         | `default` &#124; `card` &#124; `gap-card` &#124;`sub-gap-card` | `default`  | 展示类型             | N    |
| disabled     | ` boolean`                                                     | false      | 禁用                 | N    |
| layout       | `horizontal ` &#124; ` vertical`                               | `vertical` | 垂直/水平布局        | N    |

### ArRadioGroup Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArRadioGroup Events

| 名称   | 参数          | 描述     |            |
| ------ | ------------- | -------- | ---------- |
| change | `(val: string | number)` | 变更时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                | 默认值                           | 描述                      |
| ----------------------------------- | -------------------------------- | ------------------------- |
| --le-radio-icon-size                | 48px                             | 图标尺寸                  |
| --le-radio-bg-color                 | #fff                             | 背景色                    |
| --le-radio-card-border-radius       | `var(--le-card-border-radius)`   | 卡片样式圆角              |
| --le-radio-card-gap                 | 16px                             | 分隔卡片的间距            |
| --le-radio-horizontal-padding       | 24px                             | 水平内边距                |
| --le-radio-vertical-padding         | 32px                             | 垂直内边距                |
| --le-radio-icon-disabled-color      | `var(--le-color-weak-text)`      | 禁用-选中状态下图标颜色   |
| --le-radio-icon-uncheck-color       | `var(--le-color-secondary-text)` | 禁用-非选择状态下图标颜色 |
| --le-radio-label-color              | `var(--le-color-important-text)` | 标题颜色                  |
| --le-radio-label-disabled-color     | `var(--le-color-secondary-text)` | 禁用状态标题颜色          |
| --le-radio-description-color        | `var(--le-color-secondary-text)` | 描述文案颜色              |
| --le-radio-sub-gap-card-label-color | `var(--le-color-normal-text)`    | 二级卡片 label 颜色       |
| --le-radio-sub-gap-card-bg-color    | `var(--le-color-global-bg)`      | 二级卡片背景颜色          |

<!-- RAG SPLIT -->

# ArCheckBox 复选框

## 描述信息（When to use）

用于预设的一组选项中执行多项选择，并呈现选择结果

## 使用示例（Examples）

### 通栏模式

当只有单个单选框建议直接使用 checkbox, 有多个选项单选时建议使用 checkboxGroup 包裹

```vue
<template>
  <div class="checkbox-wrap">
    <ArCheckBoxGroup :default-value="['1', '2', '4']" :options="options" @change="change"> </ArCheckBoxGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { CheckBoxProps } from '../index'
const options = reactive<Partial<CheckBoxProps>[]>([])
onMounted(() => {
  options.push(
    { label: '使用 CheckBoxGroup 包裹一组单选', value: '1', placement: 'left' },
    {
      label: '通过 options 属性传入列表',
      value: '2',
      description: '描述文案描述文案描述文案描述文案。',
      placement: 'left'
    },
    { label: '标题文案', value: '3', description: '描述文案描述文案描述文案描述文案。', placement: 'left' },
    {
      label: '禁用文案',
      value: '4',
      description: '描述文案描述文案描述文案描述文案。',
      placement: 'left',
      disabled: true
    }
  )
})
const change = (val: any[]) => console.log('change', val)
</script>

<style lang="less" scoped>
.checkbox-wrap {
  padding: 40px 0;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
}
</style>
```

### 卡片模式

卡片模式本身并不提供外边距，而需要外层或页面提供内边距实现
<br/>
卡片的 type 类型有 4 种：`default(默认) | card | gap-card | sub-gap-card`

```vue
<template>
  <div class="checkbox-wrap">
    <ArCheckBox value="1" label="单独使用CheckBox的卡片样式" borderless card />
  </div>

  <div class="checkbox-wrap">
    <ArCheckBoxGroup :value="checkboxValue1" type="card" @change="change1">
      <ArCheckBox value="1" label="card大卡片样式" />
      <ArCheckBox value="2" label="标题文案" description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。" />
      <ArCheckBox
        value="3"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
      ></ArCheckBox>
    </ArCheckBoxGroup>
  </div>

  <div class="checkbox-gap-wrap">
    <ArCheckBoxGroup v-model="checkboxValue2" type="gap-card">
      <ArCheckBox value="1" label="gap-card隔断卡片样式" />
      <ArCheckBox value="2" label="标题文案" description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。" />
      <ArCheckBox
        value="3"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
      ></ArCheckBox>
    </ArCheckBoxGroup>
  </div>

  <div class="checkbox-sub-gap-wrap">
    <ArCheckBoxGroup :default-value="['3']" type="sub-gap-card" @change="change">
      <ArCheckBox value="1" label="sub-gap-card二级卡片样式" />
      <ArCheckBox value="2" label="一种罕见于弹窗中的单选框" />
      <ArCheckBox value="3" label="与一般单项框大小和颜色有差异"></ArCheckBox>
    </ArCheckBoxGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const checkboxValue1 = reactive(['1', '2'])
const checkboxValue2 = ref(['2', '3'])

const change1 = (val: string[]) => checkboxValue1.splice(0, checkboxValue1.length, ...val)
const change = (val: string[]) => console.log('change', val)
</script>

<style lang="less" scoped>
.checkbox-wrap {
  padding: 40px 24px;
  background-color: #efefef;
}

.checkbox-gap-wrap {
  padding: 40px 24px;
  background-color: #efefef;
}

.checkbox-sub-gap-wrap {
  padding: 40px 24px;
}
</style>
```

### 横向布局

```vue
<template>
  <div class="checkBox-wrap">
    <ArCheckBoxGroup class="box" :default-value="['1', '2']">
      <ArCheckBox :block="false" value="1" label="既会唱歌" placement="left" />
      <ArCheckBox :block="false" value="2" label="又会跳舞" placement="left" />
      <ArCheckBox :block="false" value="3" label="暗藏玄机" placement="left" />
    </ArCheckBoxGroup>

    <ArCheckBoxGroup class="box box1" type="card">
      <ArCheckBox :block="false" value="1" label="唱" placement="left" />
      <ArCheckBox :block="false" value="2" label="跳" placement="left" />
      <ArCheckBox :block="false" value="3" label="Rap" placement="left"></ArCheckBox>
    </ArCheckBoxGroup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.box {
  display: flex;
  padding: 24px;
  background-color: #fff;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}

.box1 {
  margin: 0 24px;
}
.checkBox-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

### 禁用状态

```vue
<template>
  <div class="CheckBox-wrap">
    <ArCheckBoxGroup :default-value="['1']" disabled @change="change">
      <ArCheckBox
        value="1"
        label="标题文案"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
        placement="left"
        checked
      ></ArCheckBox>

      <ArCheckBox
        value="2"
        label="禁用不可选"
        description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案。"
        placement="left"
      ></ArCheckBox>
    </ArCheckBoxGroup>
  </div>
</template>

<script setup lang="ts">
const change = (val: string[]) => console.log('change', val)
</script>

<style lang="less" scoped>
.CheckBox-wrap {
  padding: 40px 0;
  background-color: #efefef;
}
</style>
```

## API

### CheckBox Props

| 名称        | 类型                                        | 默认值  | 说明             | 必传 |
| ----------- | ------------------------------------------- | ------- | ---------------- | ---- |
| checked     | boolean                                     | `false` | 是否选中         | N    |
| label       | string                                      | -       | 标题             | N    |
| description | string                                      | -       | 描述文案         | N    |
| disabled    | boolean                                     | `false` | 禁用             | N    |
| value       | `string ` &#124; `number` &#124; ` boolean` | -       | 值               | N    |
| placement   | `left ` &#124; ` right`                     | `right` | 图标相对文案位置 | N    |
| card        | boolean                                     | `false` | 展示卡片类型     | N    |
| block       | boolean                                     | `true`  | 是否为块级       | N    |
| borderless  | boolean                                     | `false` | 无边框模式       | N    |

### CheckBox Events

| 名称   | 参数             | 描述       |
| ------ | ---------------- | ---------- |
| change | `(val: boolean)` | 变更时触发 |

### CheckBoxGroup Props

| 名称         | 类型                                                           | 默认值     | 说明                 | 必传 |
| ------------ | -------------------------------------------------------------- | ---------- | -------------------- | ---- |
| value        | `string ` &#124; `number`                                      | -          | 当前值，支持 v-model | N    |
| defaultValue | `string ` &#124; `number`                                      | -          | 默认值               | N    |
| options      | `Partial<TCheckBoxProps>[]`                                    | `default`  | 列表渲染             | N    |
| type         | `default` &#124; `card` &#124; `gap-card` &#124;`sub-gap-card` | `default`  | 展示类型             | N    |
| disabled     | ` boolean`                                                     | false      | 禁用                 | N    |
| layout       | `horizontal ` &#124; ` vertical`                               | `vertical` | 垂直/水平布局        | N    |

### CheckBoxGroup Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CheckBoxGroup Events

| 名称   | 参数                      | 描述       |
| ------ | ------------------------- | ---------- |
| change | `(val: string \| number)` | 变更时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                   | 默认值                           | 描述                      |
| -------------------------------------- | -------------------------------- | ------------------------- |
| --le-checkbox-icon-size                | 48px                             | 图标尺寸                  |
| --le-checkbox-bg-color                 | #fff                             | 背景色                    |
| --le-checkbox-card-border-radius       | `var(--le-card-border-radius)`   | 卡片样式圆角              |
| --le-checkbox-card-gap                 | 16px                             | 分隔卡片的间距            |
| --le-checkbox-vertical-padding         | 32px                             | 垂直内边距                |
| --le-checkbox-horizontal-padding       | 24px                             | 水平内边距                |
| --le-checkbox-icon-disabled-color      | `var(--le-color-weak-text)`      | 禁用-选中状态下图标颜色   |
| --le-checkbox-icon-uncheck-color       | `var(--le-color-secondary-text)` | 禁用-非选择状态下图标颜色 |
| --le-checkbox-label-color              | `var(--le-color-important-text)` | 标题颜色                  |
| --le-checkbox-label-disabled-color     | `var(--le-color-secondary-text)` | 禁用状态标题颜色          |
| --le-checkbox-description-color        | `var(--le-color-secondary-text)` | 描述文案颜色              |
| --le-checkbox-sub-gap-card-label-color | `var(--le-color-normal-text)`    | 二级卡片 label 颜色       |
| --le-checkbox-sub-gap-card-bg-color    | `var(--le-color-global-bg)`      | 二级卡片背景颜色          |

<!-- RAG SPLIT -->

# ArTagOption 选项标签

## 描述信息（When to use）

用于由一组标签组件组成的单选或多选场景

## 使用示例（Examples）

### 布局类型

TagOption 提供两种布局方式，对部分其他属性存在预设
<br/>
`layout: equal`，size 默认为 extra-large，circle 默认为 true
<br/>
`layout: inline`，size 默认为 large，circle 默认为 false

```vue
<template>
  <div class="tagoption-wrap">
    <ArTagOption
      title="layout：equal 默认等宽布局"
      layout="equal"
      :value="currentEqual"
      :options="options"
      column="3"
      @change="(val) => (currentEqual = val)"
    ></ArTagOption>
    <div class="msg">{{ currentEqual }}</div>
  </div>

  <div class="tagoption-wrap">
    <ArTagOption
      title="layout：inline 等距布局"
      layout="inline"
      :value="currentInline"
      :options="options"
      @change="(val) => (currentInline = val)"
    ></ArTagOption>
    <div class="msg">{{ currentInline }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentEqual = ref([0])
const currentInline = ref([0])

const infos = [
  '篮球',
  '唱',
  '跳',
  'Rap',
  '鸡你太美',
  '中分',
  '背带裤',
  '一位故人',
  '实习生',
  '我是练习两年半的',
  '坤坤'
]
const options = computed(() => infos.map((item, index) => ({ label: item, value: index })))
</script>

<style lang="less" scoped>
.tagoption-wrap {
  padding: 24px;
}
.msg {
  padding: 24px 24px 0;
}
</style>
```

### 支持多选

设置 multiply 支持多选，maxCount 设置最大选择数量

```vue
<template>
  <div class="tagoption-wrap">
    <ArTagOption
      v-model="current"
      title="支持多选，同时可设置上限：望岳 ——杜甫"
      :options="options"
      column="2"
      multiply
      :max-count="4"
      @over-count="overCount"
    >
      <template #titleIcon>
        <CommonScheduleIcon color="#2A2A2D" />
      </template>
    </ArTagOption>
    <div class="msg">{{ current }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CommonScheduleIcon } from '@lefit/aries-ui-icon'
import { useToast } from '@/toast'
const current = ref([0, 3])
const infos = [
  '岱宗夫如何',
  '齐鲁青未了',
  '造化钟神秀',
  '阴阳割昏晓',
  '荡胸生曾云',
  '决眦入归鸟',
  '会当凌绝顶',
  '一览众山小'
]
const options = reactive(infos.map((item, index) => ({ label: item, value: index })))
const overCount = () => useToast()('只能选择4项哦~')
</script>

<style lang="less" scoped>
.tagoption-wrap {
  padding: 24px;
}
.msg {
  padding: 24px 24px 0;
}
</style>
```

### 流式布局

```vue
<template>
  <div class="tagoption-wrap">
    <ArTagOption
      layout="inline"
      size="extra-large"
      :default-value="currentInline"
      :options="options"
      default-type="light"
      active-type="primary"
      circle
      :allow-empty="false"
      @change="(val) => (currentInline = val)"
    ></ArTagOption>
  </div>
  <div class="msg">{{ currentInline }}</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const currentInline = ref([0])

const infos = ['待约课', '未转化', '已转化', '已流失']
const options = computed(() => infos.map((item, index) => ({ label: item, value: index })))
</script>

<style lang="less" scoped>
.tagoption-wrap {
  padding: 12px 24px;
}
.msg {
  padding: 24px 24px 0;
}
</style>
```

### 设置徽标

```vue
<template>
  <div class="tagoption-wrap">
    <ArTagOption v-model="current" :options="options" column="3" multiply @over-count="overCount"> </ArTagOption>
    <div class="msg">{{ current }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '@/toast'
const current = ref([0, 3])

const options = computed(() => [
  { label: '岱宗夫如何', value: 0, badgeProps: { content: '做完H5', border: current.value.includes(0) } },
  { label: '齐鲁青未了', value: 1 },
  { label: '造化钟神秀', value: 2, badgeProps: { content: '还要做RN', border: current.value.includes(2) } },
  { label: '阴阳割昏晓', value: 3 },
  { label: '荡胸生曾云', value: 4 },
  { label: '决眦入归鸟', value: 5 },
  { label: '会当凌绝顶', value: 6, badgeProps: { content: '还要做Uni', border: current.value.includes(6) } },
  { label: '一览众山小', value: 7, badgeProps: { content: '嘿嘿嘿', border: current.value.includes(7) } }
])
const overCount = () => useToast()('只能选择4项哦~')
</script>

<style lang="less" scoped>
.tagoption-wrap {
  padding: 24px;
}
.msg {
  padding: 24px 24px 0;
}
</style>
```

## API

### TagOption Props

| 名称         | 类型                           | 默认值       | 说明                                                                                                     | 必传 |
| ------------ | ------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------- | ---- |
| title        | string                         | -            | 标题                                                                                                     | N    |
| options      | `TTagOptionsItem[]`            | `[]`         | 选项列表，[详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/tagoption/types.ts) | N    |
| layout       | `equal ` &#124; ` inline`      | `equal`      | 布局方式                                                                                                 | N    |
| defaultType  | `TagProps[type]`               | `light-grey` | 未选中状态标签类型                                                                                       | N    |
| activeType   | `TagProps[type]`               | `light`      | 选中状态标签类型                                                                                         | N    |
| size         | `TagProps[size]`               | -            | 尺寸，[同 tag 的 size](http://localhost:18000/components/tag?tab=api)                                    | N    |
| circle       | boolean                        | -            | 圆角                                                                                                     | N    |
| column       | `string ` &#124; ` number`     | `1`          | 展示列数，仅当 layout 为 equal 生效                                                                      | N    |
| multiply     | boolean                        | `false`      | 多选                                                                                                     | N    |
| maxCount     | `string ` &#124; ` number`     | -            | 多选时的最大数量                                                                                         | N    |
| allowEmpty   | boolean                        | `true`       | 允许为空                                                                                                 | N    |
| value        | `(string ` &#124; ` number)[]` | `[]`         | 当前值，支持 v-model                                                                                     | N    |
| defaultValue | `(string ` &#124; ` number)[]` | `[]`         | 默认值                                                                                                   | N    |

### TagOption Events

| 名称       | 参数                          | 描述               |
| ---------- | ----------------------------- | ------------------ |
| change     | `(val: (string \| number)[])` | 点击时触发         |
| over-count | `(val: (string \| number)[])` | 多选超出上限时触发 |

### TTagOptionsItem

| 名称       | 类型                       | 默认值 | 说明     | 必传 |
| ---------- | -------------------------- | ------ | -------- | ---- |
| label      | string                     | -      | 文案     | N    |
| value      | `string ` &#124; ` number` | -      | 值       | N    |
| badgeProps | `Partial<BadgeProps>`      | -      | 徽标属性 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                            | 默认值                        | 描述         |
| ------------------------------- | ----------------------------- | ------------ |
| --le-tagoption-title-icon-size  | 36px                          | 标题图标尺寸 |
| --le-tagoption-title-icon-gap   | 12px                          | 标题图标间距 |
| --le-tagoption-title-font-size  | 28px                          | 标题文字大小 |
| --le-tagoption-option-height    | 56px                          | 选项高度     |
| --le-tagoption-option-font-size | 24px                          | 选项文字大小 |
| --le-tagoption-title-color      | `var(--le-color-normal-text)` | 标题文字颜色 |

<!-- RAG SPLIT -->

# ArInput 输入框

## 描述信息（When to use）

用于承载用户信息录入的文本框，常用于表单、对话框等场景，对不同内容的信息录入，可拓展形成多种信息录入形式

## 使用示例（Examples）

### 左侧图标及标题

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput
        :value="test"
        placeholder="请输入内容"
        @change="(val) => handler(val)"
        @blur="(val) => handler(val)"
        @focus="(val) => handler(val)"
      ></ArInput>
      <ArInput label="标题文案" placeholder="请输入内容"></ArInput>
      <ArInput label="标题文案" placeholder="请输入内容">
        <template #leftIcon>
          <PasswordIcon color="#2a2a2d" />
        </template>
      </ArInput>
      <ArInput placeholder="请输入内容">
        <template #leftIcon>
          <PasswordIcon color="#2a2a2d" />
        </template>
      </ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/toast'
import { PasswordIcon } from '@lefit/aries-ui-icon'
import { ref } from 'vue'
const test = ref('测试文字')
const toast = useToast()

const handler = (val) => {
  console.log(val)
  val?.toString() && toast(val)
}
</script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

### 组件类型

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput label="密码" type="password" placeholder="请输入密码" show-password-icon></ArInput>
      <ArInput label="纯数字" type="number" placeholder="请输入数字"></ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

### 垂直布局

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput layout="vertical" label="标题文案" placeholder="请输入内容"></ArInput>
      <ArInput layout="vertical" label="标题文案" placeholder="请输入内容">
        <template #leftIcon>
          <PasswordIcon color="#2a2a2d" />
        </template>
      </ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { PasswordIcon } from '@lefit/aries-ui-icon'
</script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

### 文字对齐方式

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput label="标题文案" card align="left" placeholder="请输入内容"></ArInput>
      <ArInput label="标题文案" card align="center" placeholder="请输入内容"></ArInput>
      <ArInput label="标题文案" card align="right" placeholder="请输入内容"></ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

### 禁用状态

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput label="用户名" placeholder="请输入金额" :value="2976084116323" align="right" disabled> </ArInput>
      <ArInput
        label="密码"
        type="password"
        placeholder="请输入金额"
        value="akjshdjkfhklsd"
        align="right"
        show-password-icon
        disabled
      >
      </ArInput>
      <ArInput label="单价" placeholder="请输入金额" :value="199" align="right" disabled>
        <template #right> 元 </template>
      </ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

### 更多用法

```vue
<template>
  <div class="input-wrap">
    <ArSpace direction="column" gap="0.2rem">
      <ArInput label="单价" placeholder="请输入金额" align="right">
        <template #right> 元 </template>
      </ArInput>
      <ArInput label="单价" placeholder="请输入金额">
        <template #right>
          <ArButton size="small" type="text" :style="{ margin: '-1px 0' }">发送短信验证码</ArButton>
        </template>
      </ArInput>
      <ArInput label="单价" placeholder="请输入金额">
        <template #right> <ArSwitch v-model="test" size="small" :style="{ margin: '-2px 0' }"></ArSwitch></template>
      </ArInput>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const test = ref(true)
</script>

<style lang="less" scoped>
.input-wrap {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
}
</style>
```

## API

### ArInput Props

| 名称             | 类型                                    | 默认值       | 说明                                                                                                               | 必传 |
| ---------------- | --------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | ---- |
| label            | string                                  | -            | 文案                                                                                                               | N    |
| align            | `left ` &#124; `center` &#124; ` right` | `left`       | 文本内容位置                                                                                                       | N    |
| type             | `TArInputType`                          | `text`       | 类型                                                                                                               | N    |
| layout           | `horizontal ` &#124; ` vertical`        | `horizontal` | 布局方式                                                                                                           | N    |
| value            | `string ` &#124; ` number`              | -            | 值，支持 v-model                                                                                                   | N    |
| defaultValue     | `string ` &#124; ` number`              | -            | 默认值                                                                                                             | N    |
| placeholder      | string                                  | -            | 占位符                                                                                                             | N    |
| card             | boolean                                 | `false`      | 展示卡片样式                                                                                                       | N    |
| borderless       | boolean                                 | `false`      | 无边框模式                                                                                                         | N    |
| autocomplete     | string                                  | -            | 是否开启自动填充功能，HTML5 原生属性                                                                               | N    |
| autofocus        | boolean                                 | `false`      | 自动聚焦                                                                                                           | N    |
| disabled         | boolean                                 | `false`      | 禁用                                                                                                               | N    |
| maxLength        | `string ` &#124; ` number`              | -            | 可以输入的文本长度                                                                                                 | N    |
| readonly         | boolean                                 | `false`      | 只读                                                                                                               | N    |
| showPasswordIcon | boolean                                 | `false`      | 当 type 为 password 时，显示\隐藏密码的图标                                                                        | N    |
| enterkeyhint     | string                                  | -            | 控制键盘的回车键样式. [详见 MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | N    |

### ArInput Events

| 名称   | 参数           | 描述       |
| ------ | -------------- | ---------- |
| change | `(val:string)` | 变更时触发 |
| focus  | `(val:string)` | 聚焦时触发 |
| blur   | `(val:string)` | 失焦时触发 |

### ArInput Slots

| 名称     | 描述           |
| -------- | -------------- |
| leftIcon | 左侧图标插槽   |
| right    | 输入框右侧插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                 | 默认值                           | 描述                       |
| ------------------------------------ | -------------------------------- | -------------------------- |
| --le-input-horizontal-padding        | 24px                             | 水平内边距                 |
| --le-input-vertical-padding          | 28px                             | 垂直内边距                 |
| --le-input-title-font-size           | 32px                             | 标题文字大小               |
| --le-input-content-font-size         | 32px                             | 内容文字大小               |
| --le-input-icon-size                 | 48px                             | 左侧图标尺寸               |
| --le-input-icon-gap                  | 16px                             | 图标与右侧标题的间距       |
| --le-input-vertical-title-gap        | 8px                              | 垂直布局标题与内容的间距   |
| --le-input-label-max-width           | 4.5em                            | 主文案区域最大宽度         |
| --le-input-label-color               | `var(--le-color-important-text)` | 主文案颜色                 |
| --le-input-horizontal-label-gap      | 40px                             | 水平布局文案与输入框的间距 |
| --le-input-content-color             | `var(--le-color-normal-text)`    | 输入文字颜色               |
| --le-input-content-disabled-color    | `var(--le-color-secondary-text)` | 禁用状态输入文字颜色       |
| --le-input-content-bg-color          | transparent                      | 输入背景颜色               |
| --le-input-content-placeholder-color | `var(--le-color-secondary-text)` | 占位符文字颜色             |
| --le-input-right-slot-gap            | 16px                             | 右侧插槽内容与输入框的间距 |
| --le-input-border-radius             | 24px                             | 输入框卡片样式圆角         |
| --le-input-content-font-family       | inherit                          | input 中内容字体           |

<!-- RAG SPLIT -->

# ArForm 表单

## 描述信息（When to use）

用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="form-wrap">
    <ArForm :layout="layout" label-width="1.8rem">
      <ArFormItem label="用户名" required>
        <ArInput v-model="formData.username" borderless placeholder="请输入用户名"></ArInput>
      </ArFormItem>

      <ArFormItem label="生日" arrow required @click="birthVisible = true">
        <ArInput
          v-model="formData.birth"
          borderless
          readonly
          placeholder="请选择生日"
          :align="layout === 'horizontal' ? 'right' : 'left'"
        ></ArInput>
        <ArPopup v-model="birthVisible" placement="bottom" close-on-overlay-click>
          <ArDatePicker
            :value="formData.birth"
            :default-value="new Date('2000-01-01').getTime()"
            format="YYYY-MM-DD"
            mode="date"
            start="1950-01-01"
            :end="new Date().getTime()"
            @confirm="birthConfirm"
            @cancel="birthVisible = false"
          ></ArDatePicker>
        </ArPopup>
      </ArFormItem>

      <ArFormItem label="性别" required>
        <ArRadioGroup v-model="formData.gender" default-value="1">
          <ArRadio :block="false" value="1" label="男" placement="left" :style="{ marginRight: '0.4rem' }" />
          <ArRadio :block="false" value="2" label="女" placement="left" />
        </ArRadioGroup>
      </ArFormItem>

      <ArFormItem label="爱好" required>
        <ArCheckBoxGroup v-model="formData.habits">
          <ArCheckBox :block="false" value="唱" label="唱" placement="left" :style="{ marginRight: '0.4rem' }" />
          <ArCheckBox :block="false" value="跳" label="跳" placement="left" :style="{ marginRight: '0.4rem' }" />
          <ArCheckBox :block="false" value="Rap" label="Rap" placement="left"></ArCheckBox>
        </ArCheckBoxGroup>
      </ArFormItem>

      <ArFormItem label="每日几餐" required :content-align="layout === 'horizontal' ? 'right' : 'center'">
        <ArStepper v-model="formData.times" />
      </ArFormItem>

      <ArFormItem label="运动目的" required>
        <ArTagOption v-model="formData.sport" :options="options" column="3" multiply></ArTagOption>
      </ArFormItem>

      <ArFormItem label="备注">
        <ArTextarea
          v-model="formData.message"
          card
          show-counter
          rows="3"
          placeholder="春眠不觉晓..."
          :max-length="100"
        ></ArTextarea>
      </ArFormItem>

      <ArFormItem label="消息提示" layout="horizontal">
        <ArSwitch v-model="formData.status" size="small"></ArSwitch>
      </ArFormItem>

      <ArFormItem label="简易使用" value="使用value参数也可"> </ArFormItem>
      <ArButton block :style="{ marginBottom: '0.24rem' }" @click="submit">提交</ArButton>
    </ArForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps<{
  layout: 'horizontal' | 'vertical'
}>()

const formData = reactive({
  username: '',
  birth: '',
  gender: 0,
  message: '',
  times: 3,
  sport: [],
  habits: [],
  status: false
})

const birthVisible = ref(false)

const birthConfirm = (val: string) => {
  birthVisible.value = false
  formData.birth = val
}

const submit = () => {
  console.log('formData', formData)
}

const infos = ['减脂塑型', '增肌', '产后修复', '搏击格斗', '保持健康']
const options = reactive(infos.map((item) => ({ label: item, value: item })))
</script>

<style lang="less" scoped>
.form-wrap {
  padding: 40px 24px;
  --le-textarea-bg-color: #f5f6fa;
}
</style>
```

## API

### ArForm Props

| 名称         | 类型                                    | 默认值                            | 说明                 | 必传 |
| ------------ | --------------------------------------- | --------------------------------- | -------------------- | ---- |
| layout       | `horizontal ` &#124; ` vertical`        | `vertical`                        | 布局方式             | N    |
| labelWidth   | string                                  | `auto`                            | label 的宽度         | N    |
| labelAlign   | `top ` &#124; `bottom` &#124; ` center` | `top`                             | label 的纵向排列方式 | N    |
| contentAlign | `left ` &#124; `center` &#124; ` right` | `垂直布局为left，水平布局为right` | 内容区的排列方式     | N    |

### ArForm Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArFormItem Props

| 名称         | 类型                                    | 默认值                            | 说明                 | 必传 |
| ------------ | --------------------------------------- | --------------------------------- | -------------------- | ---- |
| label        | string                                  | -                                 | 主文案               | N    |
| value        | string                                  | number                            | 内容                 | N    |
| required     | boolean                                 | `false`                           | 必填                 | N    |
| arrow        | boolean                                 | `false`                           | 显示右箭头           | N    |
| layout       | `horizontal ` &#124; ` vertical`        | `vertical`                        | 布局方式             | N    |
| labelWidth   | string                                  | `auto`                            | label 的宽度         | N    |
| labelAlign   | `top ` &#124; `bottom` &#124; ` center` | `top`                             | label 的纵向排列方式 | N    |
| contentAlign | `left ` &#124; `center` &#124; ` right` | `垂直布局为left，水平布局为right` | 内容区的排列方式     | N    |

### ArFormItem Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                   | 默认值                           | 描述                        |
| -------------------------------------- | -------------------------------- | --------------------------- |
| --le-form-vertical-lable-margin-bottom | 8px                              | 垂直布局中 label 的下外边距 |
| --le-form-item-vertical-padding        | 32px                             | formItem 的垂直方向边距     |
| --le-form-item-label-font-weight       | 500                              | label 文字粗细              |
| --le-form-item-label-font-size         | 32px                             | label 文字大小              |
| --le-form-item-label-color             | `var(--le-color-important-text)` | label 文字颜色              |
| --le-form-item-required-color          | #ff5a20                          | 必填符号颜色                |
| --le-form-item-content-color           | `var(--le-color-normal-text)`    | 内容区文字颜色              |
| --le-form-item-content-font-size       | 32px                             | 内容区文字大小              |
| --le-form-item-arrow-font-size         | 32px                             | 右侧箭头尺寸                |
| --le-form-item-arrow-gap               | 16px                             | 右侧箭头与内容区域的间距    |
| --le-form-item-arrow-color             | `var(--le-color-secondary-text)` | 箭头颜色                    |

<!-- RAG SPLIT -->

# ArStepper 步进器

## 描述信息（When to use）

用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值

## 使用示例（Examples）

### 组件尺寸

```vue
<template>
  <div class="stepper-wrap">
    <ArStepper size="large"></ArStepper>
    <ArStepper size="medium"></ArStepper>
    <ArStepper size="small"></ArStepper>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.stepper-wrap {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 24px;
  }
}
</style>
```

### 组件状态

```vue
<template>
  <div class="stepper-wrap">
    <ArStepper :value="123" :show-border="false"></ArStepper>
    <ArStepper :value="1" :min="1"></ArStepper>
    <ArStepper :value="999" :max="999"></ArStepper>
    <ArStepper :value="123" disabled></ArStepper>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.stepper-wrap {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 24px;
  }
}
</style>
```

### 允许输入

```vue
<template>
  <div class="stepper-wrap">
    <ArStepper allow-input :step="0.1"></ArStepper>
    <ArStepper allow-input :precision="0" :step="1"></ArStepper>
    <ArStepper allow-input :precision="1" :step="0.1"></ArStepper>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.stepper-wrap {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 24px;
  }
}
</style>
```

## API

### ArStepper Props

| 名称         | 类型                                     | 默认值   | 说明                                                                                        | 必传 |
| ------------ | ---------------------------------------- | -------- | ------------------------------------------------------------------------------------------- | ---- |
| value        | number                                   | -        | 值，支持 v-model                                                                            | N    |
| defaultValue | number                                   | -        | 默认值                                                                                      | N    |
| size         | `large ` &#124; `medium` &#124; ` small` | `medium` | 尺寸，对应设计稿`750`尺寸<p>`large h-58px`</p> <p>`medium h-48px`</p> <p>`small h-38px`</p> | N    |
| showBorder   | boolean                                  | `true`   | 展示数值的边框                                                                              | N    |
| min          | number                                   | `0`      | 最小值                                                                                      | N    |
| max          | number                                   | -        | 最大值                                                                                      | N    |
| step         | number                                   | `1`      | 步长                                                                                        | N    |
| allowInput   | boolean                                  | `false`  | 允许输入                                                                                    | N    |
| disabled     | boolean                                  | `false`  | 禁用状态                                                                                    | N    |
| precision    | number                                   | `0`      | 数值精度                                                                                    | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                              | 默认值  | 描述                     |
| --------------------------------- | ------- | ------------------------ |
| --le-stepper-icon-color           | #534E63 | 图标颜色                 |
| --le-stepper-icon-disabled-color  | #D0CFD6 | 禁用状态下图标颜色       |
| --le-stepper-btn-bg-color         | #F6F7FB | 按钮背景色               |
| --le-stepper-large-btn-size       | 58px    | 按钮尺寸                 |
| --le-stepper-medium-btn-size      | 48px    |                          |
| --le-stepper-small-btn-size       | 38px    |                          |
| --le-stepper-large-border-radius  | 10px    | 按钮圆角                 |
| --le-stepper-medium-border-radius | 8px     |                          |
| --le-stepper-small-border-radius  | 6px     |                          |
| --le-stepper-large-icon-size      | 24px    | 图标尺寸                 |
| --le-stepper-medium-icon-size     | 20px    |                          |
| --le-stepper-small-icon-size      | 16px    |                          |
| --le-stepper-large-gap            | 14px    | 按钮间距                 |
| --le-stepper-medium-gap           | 12px    |                          |
| --le-stepper-small-gap            | 10px    |                          |
| --le-stepper-input-width          | 92px    | 输入框长度               |
| --le-stepper-input-height         | 48px    | 输入框高度               |
| --le-stepper-input-border-radius  | 12px    | 输入框圆角               |
| --le-stepper-input-border-color   | #D0CFD6 | 输入框边框色             |
| --le-stepper-input-bg-color       | #fff    | 输入框背景颜色           |
| --le-stepper-input-font-size      | 26px    | 输入框文字大小           |
| --le-stepper-input-color          | #2A2A2D | 输入框文字颜色           |
| --le-stepper-input-disabled-color | #ABA7B6 | 禁用状态下输入框文字颜色 |

<!-- RAG SPLIT -->

# ArRate 评分

## 描述信息（When to use）

用于对某行为/事物进行打分

## 使用示例（Examples）

### 组件类型

type 有两种类型，star 对应星级评分，expression 对应表情评分

```vue
<template>
  <div class="rate-wrap">
    <ArRate :value="1" :show-description="false" size="mini"></ArRate>
    <ArRate :value="2" :show-description="false" size="small"></ArRate>
    <ArRate :value="4" :show-description="false" size="medium"></ArRate>
    <ArRate :value="3" :show-description="false" size="large"></ArRate>
  </div>
  <div class="rate-wrap">
    <ArRate :value="5" size="small"></ArRate>
    <ArRate :value="3" size="medium"></ArRate>
    <ArRate :value="1" size="large"></ArRate>
  </div>
  <div class="rate-wrap">
    <ArRate :value="3" type="expression" @change="change"></ArRate>
  </div>
  <div class="rate-wrap">
    <div>纯展示型:</div>
    <ArRate :value="4.991" type="display"></ArRate>
    <ArRate :value="3.54" type="display"></ArRate>
    <ArRate :value="3.48" type="display" size="small"></ArRate>
    <ArSpace>
      <ArRate :value="1" type="expression-display"></ArRate>
      <ArRate :value="2" type="expression-display"></ArRate>
      <ArRate :value="3" type="expression-display"></ArRate>
      <ArRate :value="4" type="expression-display"></ArRate>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { ArSpace } from '@lefit/aries-ui'

const change = (val: number) => {
  console.log('changeTo: ', val)
}
</script>

<style lang="less" scoped>
.rate-wrap {
  padding: 24px;
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
```

## API

### ArRate Props

| 名称            | 类型                                                                      | 默认值   | 说明             | 必传 |
| --------------- | ------------------------------------------------------------------------- | -------- | ---------------- | ---- |
| size            | `large ` &#124; `medium` &#124; `small` &#124; ` mini`                    | `medium` | 尺寸             | N    |
| descriptions    | `string[]`                                                                | `[]`     | 描述文案         | N    |
| showDescription | boolean                                                                   | `true`   | 展示描述文案     | N    |
| value           | number                                                                    | `0`      | 值，支持 v-model | N    |
| defaultValue    | number                                                                    | `0`      | 默认值           | N    |
| type            | `star ` &#124; `expression` &#124; `display` &#124; ` expression-display` | `star`   | 评分类型         | N    |
| disabled        | boolean                                                                   | `false`  | 禁用状态         | N    |

### ArRate Events

| 名称   | 参数            | 描述       |
| ------ | --------------- | ---------- |
| change | `(val: number)` | 变更时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                         | 默认值  | 描述                        |
| ---------------------------- | ------- | --------------------------- |
| --le-rate-display-desc-color | #FFB94E | display type 下描述文字颜色 |

<!-- RAG SPLIT -->

# ArUpload 上传

## 描述信息（When to use）

用于图片、视频上传

## 使用示例（Examples）

### 非受控模式

```vue
<template>
  <div class="upload-wrap">
    <ArUpload
      action="https://up.qbox.me/"
      type="image"
      :request-params="{ token }"
      :response-interceptor="(data) => ({ url: 'https://img.leoao.com/' + data.key })"
      @change="changeHandler"
    ></ArUpload>
  </div>
  <div class="upload-wrap">
    <div v-for="item in fileList" :key="item.url" class="url-item">{{ item.url }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type UploadFile } from '@/upload'
import axios from 'axios'

const token = ref('')

const fileList = reactive<UploadFile[]>([])
const changeHandler = (val: any) => {
  const newFileList = val.fileList as UploadFile[]
  fileList.splice(0, fileList.length, ...newFileList)
}

const fetchToken = async () => {
  axios.get('https://sit-pt-cms.leoao-inc.com/ninja/api/qiniu').then((res) => {
    token.value = res.data.uptoken
  })
}

fetchToken()
</script>

<style lang="less" scoped>
.upload-wrap {
  padding: 24px;

  .url-item {
    word-break: break-all;
  }
}
</style>
```

### 受控模式

```vue
<template>
  <div class="upload-wrap">
    <ArUpload
      action="https://up.qbox.me/"
      accept="image/*,video/*"
      :max-count="3"
      :file-list="fileList"
      :size-limit="1024 * 20"
      :request-params="{ token }"
      :response-interceptor="(data) => ({ url: 'https://img.leoao.com/' + data.key })"
      @change="changeHandler"
    ></ArUpload>
  </div>
  <div class="upload-wrap">
    <div v-for="item in fileList" :key="item.id" class="url-item">{{ item.url }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { type UploadFile } from '@/upload'
import axios from 'axios'

const token = ref('')

const fileList = reactive<UploadFile[]>([])

onMounted(() => {
  fileList.push(
    {
      url: 'https://img.leoao.com/Fpnh10rg5fxlEJl_h_6COZl5v1Qd',
      type: 'image'
    },
    {
      url: 'https://img.leoao.com/FuimMiRsBdbx43oVr3OIG4uLSGPF',
      type: 'video'
    }
  )
})

const changeHandler = (val: { file: UploadFile; fileList: UploadFile[] }) => {
  console.log(val, 'change')
  const newFileList = val.fileList
  fileList.splice(0, fileList.length, ...newFileList)
}

const fetchToken = async () => {
  axios.get('https://sit-pt-cms.leoao-inc.com/ninja/api/qiniu').then((res) => {
    token.value = res.data.uptoken
  })
}

fetchToken()
</script>

<style lang="less" scoped>
.upload-wrap {
  padding: 24px;

  .url-item {
    word-break: break-all;
  }
}
</style>
```

## API

### ArUpload Props

| 名称                | 类型                     | 默认值  | 说明                                                                                                       | 必传 |
| ------------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------- | ---- |
| action              | string                   | -       | 上传地址                                                                                                   | N    |
| fileList            | `ArUploadFile[]`         | -       | 上传文件文件列表，传递该属性时为受控模式                                                                   | N    |
| requestParams       | `object`                 | -       | 请求需要携带的额外参数                                                                                     | N    |
| responseInterceptor | `TResponseInterceptor`   | -       | 上传返回体的处理函数                                                                                       | N    |
| customArUploader    | `TCustomArUploaderType`  | -       | 自定义上传方法, [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/steps/types.ts) | N    |
| type                | `image ` &#124; ` video` | -       | 上传类型，可传 image、video，不传则支持图片&视频                                                           | N    |
| accept              | string                   | -       | 文件类型限制，支持 video/\*，image/\* 或 .jpg，.png，.webp 等                                              | N    |
| maxCount            | number                   | -       | 文件上传数量限制                                                                                           | N    |
| sizeLimit           | number                   | -       | 单个文件大小限制，单位 KB                                                                                  | N    |
| disabled            | boolean                  | `false` | 禁用                                                                                                       | N    |

### ArUploadFile

| 名称     | 类型                                             | 默认值 | 说明                                  | 必传 |
| -------- | ------------------------------------------------ | ------ | ------------------------------------- | ---- |
| id       | string                                           | -      | 自动生成唯一的 id                     | N    |
| type     | string                                           | -      | 上传文件类型，当前仅支持 image、video | N    |
| file     | File                                             | -      | 源文件                                | N    |
| url      | string                                           | -      | 资源下载链接                          | N    |
| thumbUrl | string                                           | -      | 缩略图链接                            | N    |
| status   | `success' \| 'failure' \| 'pending' \| 'deleted` | -      | 上传状态                              | N    |
| progress | number                                           | -      | 上传进度                              | N    |

### ArUpload Events

| 名称   | 参数                                                            | 描述       |
| ------ | --------------------------------------------------------------- | ---------- |
| change | `(event: string, file: ArUploadFile, fileList: ArUploadFile[])` | 点击时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArCascader 级联选择器

## 描述信息（When to use）

级联选择器适用于有清晰层级结构的数据集合，用户可以通过逐级查看并选择

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <div class="cascader-wrap">
    <ArCell title="维保类型" :note="selectedValue?.toString()" arrow @click="visible = true" />
    <ArCascader
      v-model="visible"
      :title="title"
      :options="options"
      close-on-overlay-click
      reset-on-close
      :style="{ height: '8rem' }"
      @confirm="confirmHandler"
    ></ArCascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderItem } from '@lefit/aries-ui'

const visible = ref(false)
const title = ref('选择标签')
const selectedValue = ref<string | number>()

const options = ref([
  {
    label: '器械维修',
    value: 1,
    children: [
      { label: '椭圆机', value: 'a-1' },
      { label: '跑步机', value: 'a-2' },
      { label: '哑铃', value: 'a-3' },
      { label: '史密斯', value: 'a-4' }
    ]
  },
  {
    label: '工程维修',
    value: 2,
    children: [
      { label: '空调', value: 'b-1' },
      { label: '门禁', value: 'b-2' },
      { label: '音响', value: 'b-3' },
      { label: '大屏', value: 'b-4' }
    ]
  }
])

options.value.forEach((item) => {
  item.children.forEach((_item: CascaderItem) => {
    _item.children = [
      { label: '人为因素损坏', value: _item.value + '-1' },
      { label: '正常使用磨损', value: _item.value + '-2' },
      { label: '正常老化', value: _item.value + '-3' },
      { label: '测试内容', value: _item.value + '-4' },
      { label: '测试内容', value: _item.value + '-5' },
      { label: '测试内容', value: _item.value + '-6' },
      { label: '测试内容', value: _item.value + '-7' },
      { label: '测试内容', value: _item.value + '-8' },
      { label: '测试内容end', value: _item.value + '-9' }
    ]
  })
})

const confirmHandler = (value: string | number, options: CascaderItem[]) => {
  console.log(value, options)
  selectedValue.value = options[options.length - 1].label
}
</script>

<style lang="less" scoped>
.cascader-wrap {
  padding: 24px 0;
  background-color: #f5f6f6;
}
</style>
```

```vue
<template>
  <div class="cascader-wrap">
    <ArCell
      title="维保类型"
      description="带默认值"
      :note="selectedValue?.toString() || '请选择'"
      arrow
      @click="visible = true"
    />
    <ArCascader
      v-model="visible"
      :title="title"
      :value="value"
      :options="options"
      close-on-overlay-click
      :style="{ height: '8rem' }"
      @confirm="changeHandler"
    ></ArCascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderItem } from '@lefit/aries-ui'

const visible = ref(false)
const title = ref('选择标签')
const selectedValue = ref<string | number>()
const value = ref('a-2-9')

const options = ref([
  {
    label: '器械维修',
    value: 1,
    children: [
      { label: '椭圆机', value: 'a-1' },
      { label: '跑步机', value: 'a-2' },
      { label: '哑铃', value: 'a-3' },
      { label: '史密斯', value: 'a-4' }
    ]
  },
  {
    label: '工程维修',
    value: 2,
    children: [
      { label: '空调', value: 'b-1' },
      { label: '门禁', value: 'b-2' },
      { label: '音响', value: 'b-3' },
      { label: '大屏', value: 'b-4' }
    ]
  }
])

options.value.forEach((item) => {
  item.children.forEach((_item: CascaderItem) => {
    _item.children = [
      { label: '人为因素损坏', value: _item.value + '-1' },
      { label: '正常使用磨损', value: _item.value + '-2' },
      { label: '正常老化', value: _item.value + '-3' },
      { label: '测试内容', value: _item.value + '-4' },
      { label: '测试内容', value: _item.value + '-5' },
      { label: '测试内容', value: _item.value + '-6' },
      { label: '测试内容', value: _item.value + '-7' },
      { label: '测试内容', value: _item.value + '-8' },
      { label: '测试内容end', value: _item.value + '-9' }
    ]
  })
})

const changeHandler = (_value: string | number, options: CascaderItem[]) => {
  console.log('confirm', _value, options)
  selectedValue.value = options[options.length - 1].label
}
</script>

<style lang="less" scoped>
.cascader-wrap {
  padding: 0 0 24px 0;
  background-color: #f5f6f6;
}
</style>
```

## API

### ArCascader Props

| 名称                | 类型                                | 默认值  | 说明                                                                                                            | 必传 |
| ------------------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- | ---- |
| visible             | boolean                             | `false` | 是否显示                                                                                                        | N    |
| title               | string                              | -       | 标题                                                                                                            | N    |
| popupToolBarType    | `tips ` &#124; ` operation`         | `tips`  | 弹窗顶部工具栏类型                                                                                              | N    |
| cancelText          | string                              | -       | 取消文案                                                                                                        | N    |
| confirmText         | string                              | -       | 确认文案                                                                                                        | N    |
| closeOnOverlayClick | boolean                             | `false` | 点击蒙层关闭                                                                                                    | N    |
| popupProps          | `Partial<PopupProps>`               | -       | 透传至 popup 的属性                                                                                             | N    |
| options             | `IArCascaderItem[]`                 | `[]`    | 选项数据                                                                                                        | N    |
| value               | `string ` &#124; ` number`          | -       | 值                                                                                                              | N    |
| autoConfirm         | `boolean ` &#124; ` TAutoConfirmFn` | `true`  | 自动完成收起弹窗，[详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/cascader/types.ts) | N    |
| showSearch          | `boolean ` &#124; ` TShowSearchFn`  | `false` | 显示搜索栏                                                                                                      | N    |
| searchProps         | `OmitedSearchProps`                 | -       | 透传至搜索栏的 props                                                                                            | N    |
| resetOnClose        | boolean                             | `false` | 关闭弹窗后重置状态                                                                                              | N    |

### IArCascaderItem type

| 属性     | 类型                |
| -------- | ------------------- |
| label    | `string`            |
| value    | `string \| number`  |
| children | `IArCascaderItem[]` |

### ArCascader Events

| 名称    | 参数                                                            | 描述                             |
| ------- | --------------------------------------------------------------- | -------------------------------- |
| change  | `(value: string \| number, selectedOptions: IArCascaderItem[])` | 点击值变化时触发                 |
| cancel  |                                                                 | 关闭时触发                       |
| confirm | `(value: string \| number, selectedOptions: IArCascaderItem[])` | 确认时触发（如果配置了确认按钮） |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                      | 默认值                  | 描述             |
| ----------------------------------------- | ----------------------- | ---------------- |
| --le-cascader-option-item-highlight-color | `var(--le-theme-color)` | 选项高亮文字颜色 |

<!-- RAG SPLIT -->

# ArEmpty 空状态

## 描述信息（When to use）

用于空状态时的占位提示

## 使用示例（Examples）

### 顶部距离

top 控制与顶部的距离，默认为 0; description 支持传入文字和文字数组，可显示多行

```vue
<template>
  <div class="empty-wrap">
    <ArEmpty
      image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png"
      description="世上只有Aries好"
      top="1rem"
    >
    </ArEmpty>
  </div>
</template>

<style lang="less" scoped>
.empty-wrap {
  height: 8rem;
  background-color: #efefef;
  margin: 24px 0;
}
</style>
```

### 尺寸

尺寸有三个枚举：large、small、mini

```vue
<template>
  <div class="empty-wrap">
    <ArEmpty image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png" size="small"> </ArEmpty>
  </div>
  <div class="empty-wrap">
    <ArEmpty image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png" top="1rem" size="mini"> </ArEmpty>
  </div>
</template>

<style lang="less" scoped>
.empty-wrap {
  height: 4rem;
  background-color: #efefef;
  margin: 24px 0;
}
</style>
```

### 插槽

包含两个插槽：描述插槽、按钮插槽

```vue
<template>
  <div class="empty-wrap">
    <ArEmpty image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png" top="1rem">
      <template #button>
        <ArButton size="small" style="width: 2.64rem" type="outline">点击返回</ArButton>
        <ArButton size="small" style="width: 2.64rem">点击确定</ArButton>
      </template>
    </ArEmpty>
  </div>

  <div class="empty-wrap">
    <ArEmpty image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png" size="small" class="empty">
      <template #description>
        <div>谁便说点什么吧</div>
        <div>谁便说点什么吧啊收到回复</div>
      </template>
    </ArEmpty>
  </div>
</template>

<style lang="less" scoped>
.empty-wrap {
  height: 8rem;
  background-color: #efefef;
  margin: 24px 0;
}
</style>
```

## API

### ArEmpty Props

| 名称        | 类型                                   | 默认值      | 说明           | 必传 |
| ----------- | -------------------------------------- | ----------- | -------------- | ---- |
| image       | string                                 | -           | 空状态图片地址 | N    |
| description | `string ` &#124; ` string[]`           | `暂无内容~` | 描述内容       | N    |
| top         | string                                 | -           | 距离顶部的距离 | N    |
| size        | `large ` &#124; `small` &#124; ` mini` | `large`     | 图片尺寸大小   | N    |

### ArEmpty Slots

| 名称        | 描述     |
| ----------- | -------- |
| description | 描述插槽 |
| button      | 按钮插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                               | 默认值                           | 描述       |
| ---------------------------------- | -------------------------------- | ---------- |
| --le-empty-image-size-large        | 400px                            | 图片尺寸   |
| --le-empty-image-size-small        | 300px                            |            |
| --le-empty-image-size-mini         | 120px                            |            |
| --le-empty-description-color       | `var(--le-color-secondary-text)` | 文字颜色   |
| --le-empty-description-font-size   | 28px                             | 字体大小   |
| --le-empty-description-font-weight | 400                              | 字体粗细   |
| --le-empty-image-margin-bottom     | 8px                              | 图片下边距 |
| --le-empty-button-margin-top       | 40px                             | 按钮上边距 |
| --le-empty-button-gap              | 16px                             | 按钮间距   |

<!-- RAG SPLIT -->

# ArResult 结果

## 描述信息（When to use）

反馈结果

## 使用示例（Examples）

### 组件状态

status 设置组件三种状态：success（default）、error、warning

```vue
<template>
  <div class="result-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArResult />
      <ArResult status="error" />
      <ArResult status="warning" />
    </ArSpace>
  </div>
</template>

<style lang="less" scoped>
.result-row {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
</style>
```

### 组件布局

layout 设置布局方式：horizontal（default）、vertical；content 设置文案内容；description 设置描述内容

```vue
<template>
  <div class="result-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArResult description="描述文字描述文字描述文字" layout="vertical" />
      <ArResult layout="vertical" description="描述文字描述文字描述文字" status="error" />
      <ArResult layout="vertical" description="描述文字描述文字描述文字" status="warning" />
    </ArSpace>
  </div>
</template>

<style lang="less" scoped>
.result-row {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>
```

## API

### ArResult Props

| 名称        | 类型                                        | 默认值       | 说明     | 必传 |
| ----------- | ------------------------------------------- | ------------ | -------- | ---- |
| status      | `success ` &#124; `error` &#124; ` warning` | `success`    | 结果状态 | N    |
| content     | string                                      | `自定义文案` | 文案内容 | N    |
| description | string                                      | -            | 描述     | N    |
| layout      | `horizontal ` &#124; ` vertical`            | `horizontal` | 布局方式 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                               | 默认值                           | 描述             |
| ---------------------------------- | -------------------------------- | ---------------- |
| --le-result-success-color          | `var(--le-font-color-success)`   | 成功状态字体颜色 |
| --le-result-error-color            | `var(--le-font-color-error)`     | 失败状态字体颜色 |
| --le-result-warning-color          | `var(--le-font-color-warning)`   | 告警状态字体颜色 |
| --le-result-horizontal-icon-size   | 48px                             | 水平布局图标大小 |
| --le-result-vertical-icon-size     | 144px                            | 垂直布局图标大小 |
| --le-result-horizontal-icon-gap    | 10px                             | 图标与文案的间距 |
| --le-result-vertical-icon-gap      | 28px                             |                  |
| --le-result-description-margin-top | 8px                              | 描述文案的上边距 |
| --le-result-description-color      | `var(--le-color-secondary-text)` | 描述文案颜色     |

<!-- RAG SPLIT -->

# ArAvatar 头像

## 描述信息（When to use）

用图标的形式展示用户信息

## 使用示例（Examples）

### 头像形状

image 设置头像地址，不设置时有默认头像；circle 设置是否为圆形头像；gender 设置性别

```vue
<template>
  <div class="avatar-row">
    <ArAvatar size="extra-large" image="https://img.leoao.com///mini.jpeg" />
    <ArAvatar size="extra-large" image="https://img.leoao.com///mini.jpeg" circle />
  </div>
  <div class="avatar-row">
    <ArAvatar size="extra-large" show-gender-icon />
    <ArAvatar gender="male" size="extra-large" show-gender-icon />
    <ArAvatar gender="female" size="extra-large" show-gender-icon circle />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.avatar-row {
  display: flex;
  padding: 0 20px;
  margin: 30px 0;

  & > *:not(:last-child) {
    margin-right: 40px;
  }
}
</style>
```

### 头像尺寸

size 有 6 种类型，分别对应：extra-large、large、medium、small、mini、tiny

```vue
<template>
  <div class="avatar-row">
    <ArAvatar :image="image" size="extra-large" />
    <ArAvatar :image="image" size="large" />
    <ArAvatar :image="image" size="medium" />
    <ArAvatar :image="image" size="small" />
    <ArAvatar :image="image" size="mini" />
    <ArAvatar :image="image" size="tiny" />
  </div>
  <div class="avatar-row">
    <ArAvatar :image="image" circle size="extra-large" />
    <ArAvatar :image="image" circle size="large" />
    <ArAvatar :image="image" circle size="medium" />
    <ArAvatar :image="image" circle size="small" />
    <ArAvatar :image="image" circle size="mini" />
    <ArAvatar :image="image" circle size="tiny" />
  </div>
</template>

<script setup lang="ts">
const image = 'https://img.leoao.com///mini.jpeg'
</script>

<style lang="less" scoped>
.avatar-row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 30px 0;

  & > *:not(:last-child) {
    margin-right: 30px;
  }
}
</style>
```

## API

### ArAvatar Props

| 名称           | 类型                                                                                      | 默认值   | 说明                                                                                                                                                              | 必传 |
| -------------- | ----------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| image          | string                                                                                    | -        | 头像地址                                                                                                                                                          | N    |
| alt            | string                                                                                    | -        | 图片加载失败时替代文字                                                                                                                                            | N    |
| defaultImage   | string                                                                                    | -        | 默认头像地址                                                                                                                                                      | N    |
| gender         | `male ` &#124; ` female`                                                                  | -        | 性别                                                                                                                                                              | N    |
| showGenderIcon | boolean                                                                                   | `false`  | 显示性别图标                                                                                                                                                      | N    |
| circle         | boolean                                                                                   | `false`  | 圆形头像                                                                                                                                                          | N    |
| size           | `extra-large ` &#124; `large` &#124; `medium` &#124; `small` &#124; `mini` &#124; ` tiny` | `medium` | 尺寸，对应设计稿`750`尺寸<p>`extra-large h-150px`</p><p>`large h-96px`</p> <p>`medium h-88px`</p> <p>`small h-72px`</p> <p>`mini h-44px`</p> <p>`tiny h-36px`</p> | N    |

### ArAvatar Events

| 名称  | 参数         | 描述               |
| ----- | ------------ | ------------------ |
| error | `(e: Event)` | 图片加载失败时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                  | 默认值 | 描述     |
| ------------------------------------- | ------ | -------- |
| --le-avatar-extra-large-size          | 150px  | 头像尺寸 |
| --le-avatar-large-size                | 96px   |          |
| --le-avatar-medium-size               | 88px   |          |
| --le-avatar-small-size                | 72px   |          |
| --le-avatar-mini-size                 | 44px   |          |
| --le-avatar-tiny-size                 | 36px   |          |
| --le-avatar-extra-large-border-radius | 16px   | 头像圆角 |
| --le-avatar-large-border-radius       | 12px   |          |
| --le-avatar-medium-border-radius      | 12px   |          |
| --le-avatar-small-border-radius       | 8px    |          |
| --le-avatar-mini-border-radius        | 4px    |          |
| --le-avatar-tiny-border-radius        | 4px    |          |

<!-- RAG SPLIT -->

# ArBadge 徽标

## 描述信息（When to use）

用于告知用户，该区域的状态变化或者待处理任务的数量

## 使用示例（Examples）

### 基本使用

dot 设置是否为圆点徽标；content 设置徽标内容；border 设置边框

```vue
<template>
  <div class="badge-row">
    <ArBadge dot content="123">
      <ArAvatar gender="male" />
    </ArBadge>
    <ArBadge dot>
      <ArButton type="outline" size="small">Hello</ArButton>
    </ArBadge>
    <ArBadge dot>
      <ArButton type="text">文字按钮</ArButton>
    </ArBadge>
  </div>
  <div class="badge-row">
    <ArBadge content="NEW">
      <ArAvatar gender="female" />
    </ArBadge>
    <ArBadge content="四字文字">
      <ArButton type="outline" size="small">Hello</ArButton>
    </ArBadge>
    <ArBadge content="最多四字" border>
      <ArButton size="small" :circle="false">Hello</ArButton>
    </ArBadge>
  </div>
</template>

<style lang="less" scoped>
.badge-row {
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin: 40px;

  & > *:not(:last-child) {
    margin-right: 60px;
  }
}
</style>
```

### 最大数值

maxCount 用于给数值类型设置最大值

```vue
<template>
  <div class="badge-row">
    <ArBadge :content="123">
      <ArAvatar gender="male" />
    </ArBadge>
    <ArBadge content="888" :max-count="666">
      <ArButton :circle="false" type="outline" size="small">Hello</ArButton>
    </ArBadge>
  </div>
</template>

<style lang="less" scoped>
.badge-row {
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin: 40px;

  & > *:not(:last-child) {
    margin-right: 60px;
  }
}
</style>
```

### 自定义偏移量

可通过 transform 属性设置徽标的 cssTransfrom 属性

```vue
<template>
  <div class="badge-row">
    <ArBadge content="888" :max-count="666" transform="rotate(-10deg)">
      <ArButton :circle="false" type="outline" size="small">Hello</ArButton>
    </ArBadge>
    <ArBadge content="新消息" transform="translate(0.2rem, -0.14rem)"> 未读信息 </ArBadge>
    <ArBadge dot transform="translate(-0.1rem, 0.1rem) scale(1.8)">
      <ArAvatar gender="female" />
    </ArBadge>
  </div>
</template>

<style lang="less" scoped>
.badge-row {
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin: 40px;

  & > *:not(:last-child) {
    margin-right: 60px;
  }
}
</style>
```

## API

### ArBadge Props

| 名称        | 类型                             | 默认值            | 说明                   | 必传 |
| ----------- | -------------------------------- | ----------------- | ---------------------- | ---- |
| showArBadge | boolean                          | `true`            | 是否显示徽标           | N    |
| dot         | boolean                          | `false`           | 徽标显示为小圆点       | N    |
| content     | `string ` &#124; ` number`       | -                 | 徽标内容，为空时不显示 | N    |
| maxCount    | number                           | -                 | 最大数值               | N    |
| border      | boolean                          | `false`           | 显示边框               | N    |
| transform   | `CSSStyleDeclaration[transform]` | `translate(0, 0)` | 徽标的偏移量           | N    |

### ArBadge Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                             | 默认值                       | 描述               |
| -------------------------------- | ---------------------------- | ------------------ |
| --le-badge-height                | 24px                         | 固定高度           |
| --le-badge-bg-color              | #ff5a20                      | 背景颜色           |
| --le-badge-color                 | `var(--le-font-color-white)` | 徽标字体颜色       |
| --le-badge-font-size             | 16px                         | 字体大小           |
| --le-badge-font-weight           | 500                          | 字体粗细           |
| --le-badge-dot-size              | 8px                          | 小圆点尺寸         |
| --le-badge-content-border-radius | 14px 14px 14px 2px           | 徽标圆角           |
| --le-badge-content-min-width     | 14px                         | 内容最小宽度       |
| --le-badge-content-right         | -20px                        | 徽标距离右侧偏移量 |
| --le-badge-content-top           | -18px                        | 距离顶部偏移量     |
| --le-badge-border-color          | #fff                         | 徽标边框颜色       |
| --le-badge-font-family           | inherit                      | 徽标字体           |

<!-- RAG SPLIT -->

# ArList 列表

## 描述信息（When to use）

滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项

## 使用示例（Examples）

### 基本使用

`isLoading` 用于表示当前是否处于加载中状态。
<br/>

`hasMore` 用于表示数据是否还有更多。(对应接口一般为 page \* pageSize < count)

```vue
<template>
  <div class="list-wrap">
    <ArList ref="listRef" :is-loading="isLoading" :has-more="hasMore" loading-text="加载中" @load-more="getList">
      <div class="item-wrap">
        <div v-for="(_, index) in items" :key="index" class="item">
          {{ index }}
        </div>
      </div>
    </ArList>
    <ArFab :offset="{ left: '0.4rem' }" @click="listRef?.scrollToTop">Top</ArFab>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useLoading } from '@/loading'
const loading = useLoading()

const listRef = ref()

// 是否加载完成
const hasMore = ref(true)
// 正在加载
const isLoading = ref(false)
const items = reactive<number[]>([])

const getList = async () => {
  isLoading.value = true
  if (items.length < 30) {
    await sleep()
    items.push(1, 2, 3, 4, 5, 6, 7, 8, 9)
  } else {
    // 业务中可根据 pages * pageSize >= counts 来判断
    hasMore.value = false
  }
  isLoading.value = false
}

onMounted(() => {
  const init = async () => {
    loading.show()
    await getList()
    loading.hide()
  }
  init()
})

const sleep = (num = 2000): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, num)
  })
</script>

<style lang="less" scoped>
.list-wrap {
  height: 100%;
  background-color: #efefef;
  box-sizing: border-box;
}

.item {
  background-color: #fff;
  height: 140px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  &-wrap {
    padding: 24px 24px 0;
  }
}
</style>
```

### 使用控制器

通过 controller 插槽定制加载更多

```vue
<template>
  <div class="list-wrap">
    <ArList :is-loading="isLoading" :has-more="hasMore" loading-text="加载中" @load-more="getList">
      <div class="item-wrap">
        <div v-for="(_, index) in items" :key="index" class="item">
          {{ index }}
        </div>
      </div>
      <template #controller="{ loadMore }">
        <ArButton @click="loadMore">加载更多</ArButton>
      </template>
    </ArList>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useLoading } from '@/loading'
const loading = useLoading()

// 是否加载完成
const hasMore = ref(true)
// 正在加载
const isLoading = ref(false)
const items = reactive<number[]>([])

const getList = async () => {
  isLoading.value = true
  await sleep()
  items.push(1, 2, 3, 4, 5)
  // 业务中可根据 pages * pageSize >= counts 来判断
  hasMore.value = items.length < 21
  isLoading.value = false
}

onMounted(() => {
  const init = async () => {
    loading.show()
    await getList()
    loading.hide()
  }
  init()
})

const sleep = (num = 2000): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, num)
  })
</script>

<style lang="less" scoped>
.list-wrap {
  height: 100%;
  background-color: #efefef;
  box-sizing: border-box;
}

.item {
  background-color: #fff;
  height: 140px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  &-wrap {
    padding: 24px 24px 0;
  }
}
</style>
```

## API

### ArList Props

| 名称             | 类型    | 默认值            | 说明                     | 必传 |
| ---------------- | ------- | ----------------- | ------------------------ | ---- |
| isLoading        | boolean | `false`           | 是否在加载中             | N    |
| hasMore          | boolean | `true`            | 是否仍有数据             | N    |
| loadingText      | string  | -                 | 加载时的显示文案         | N    |
| loadingOverText  | string  | `我也是有底线的~` | 全部加载完毕时的显示文案 | N    |
| loadMoreDistance | number  | `30`              | 加载更多时的触底距离     | N    |

### ArList Events

| 名称      | 参数           | 描述           |
| --------- | -------------- | -------------- |
| load-more |                | 即将触底时触发 |
| scroll    | `(top:number)` | 滚动时触发     |

### ArList Ref

| 名称        | 参数 | 描述       |
| ----------- | ---- | ---------- |
| scrollToTop |      | 滚动到顶部 |

### ArList Slots

| 名称       | 参数                     | 描述                 |
| ---------- | ------------------------ | -------------------- |
| controller | `{loadMore: () => void}` | 控制加载更多，如按钮 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                          | 默认值                           | 描述                   |
| ----------------------------- | -------------------------------- | ---------------------- |
| --le-list-load-height         | 180px                            | load 区域整体高度      |
| --le-list-load-text-color     | `var(--le-color-secondary-text)` | load 区域文字颜色      |
| --le-list-load-text-font-size | 20px                             | load 区域文字大小      |
| --le-list-loading-icon-gap    | 4px                              | loading 图标与文字间距 |
| --le-list-loading-icon-height | 76px                             | loading 图标高度       |
| --le-list-loading-icon-width  | 40px                             | loading 图标宽度       |

<!-- RAG SPLIT -->

# ArTable 表格

## 描述信息（When to use）

展示行列数据

## 使用示例（Examples）

### 基础使用

columns 列配置，dataSource 为数据源，border 配置边框显示

```vue
<template>
  <div class="table-wrap">
    <ArTable :columns="columns" :data-source="dataSource" :border="{ column: false }"></ArTable>
  </div>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import ArButton from '@/button'

const process = (val) => alert(val)

const dataSource = reactive([
  { fruit: '苹果', sweet: '76' },
  { fruit: '香蕉', sweet: '83' },
  { fruit: '蜜桔', sweet: '88' }
])

const columns = [
  {
    title: '水果',
    dataIndex: 'fruit'
  },
  {
    title: '甜度',
    dataIndex: 'sweet',
    render: (val) => h('a', { onClick: () => process(val) }, `${val}%`)
  },
  {
    title: '操作',
    render: (_, record) => h(ArButton, { onClick: () => process(record.fruit), size: 'mini' }, () => '确认')
  }
]
</script>

<style lang="less" scoped>
.table-wrap {
  padding: 40px 24px;
  background-color: var(--le-color-global-bg);
}
</style>
```

### column 更多属性

width 设置列宽，align 设置文字布局方式

```vue
<template>
  <div class="table-wrap">
    <ArTable :scroll="{ x: '16rem' }" :columns="columns" :data-source="dataSource"></ArTable>
  </div>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import { ArButton, TableColumnType } from '@lefit/aries-ui'
const process = (val) => alert(val)

const dataSource = reactive([
  { fruit: '苹果苹果苹果苹果苹果', sweet: '76' },
  { fruit: '香蕉', sweet: '83' },
  { fruit: '蜜桔', sweet: '88' }
])

const columns: TableColumnType[] = [
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '水果',
    dataIndex: 'fruit',
    align: 'center',
    render: (val) => val ?? '-'
  },
  {
    title: '甜度',
    dataIndex: 'sweet',
    align: 'center',
    render: (val) => h('a', { onClick: () => process(val) }, `${val}%`)
  },
  {
    title: '操作',
    align: 'center',
    render: (_, record) => h(ArButton, { onClick: () => process(record.fruit), size: 'mini' }, () => '确认')
  }
]
</script>

<style lang="less" scoped>
.table-wrap {
  padding: 40px 24px;
  background-color: var(--le-color-global-bg);
}
</style>
```

### 固定表头&排序

```vue
<template>
  <div class="table-wrap">
    <ArTable :columns="columns" :data-source="dataSource" :scroll="{ y: '6rem', x: '10rem' }" head-fixed></ArTable>
  </div>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import { ArButton, ArTable, type TableColumnType } from '@lefit/aries-ui'

const process = (val) => alert(val)

const dataSource = reactive([
  { fruit: '苹果', sweet: '76' },
  { fruit: '香蕉', sweet: '88' },
  { fruit: '蜜桔', sweet: '83' },
  { fruit: '葡萄', sweet: '69' },
  { fruit: '草莓', sweet: '62' },
  { fruit: '草莓', sweet: '62' },
  { fruit: '草莓', sweet: '62' },
  { fruit: '草莓', sweet: '62' },
  { fruit: '草莓', sweet: '62' },
  { fruit: '草莓', sweet: '62' }
])

const columns: TableColumnType[] = [
  {
    title: '水果',
    dataIndex: 'fruit',
    sort: true,
    render: (val) => val ?? '-'
  },
  {
    title: '水果姓',
    dataIndex: 'fruit1',
    render: (val) => val ?? '-'
  },

  {
    title: '水果名',
    dataIndex: 'fruit2',
    render: (val) => val ?? '-'
  },
  {
    title: '水果姓名',
    dataIndex: 'fruit3',
    render: (val) => val ?? '-'
  },
  {
    title: '甜度',
    dataIndex: 'sweet',
    sort: true,
    align: 'right',
    render: (val) => h('a', { onClick: () => process(val) }, `${val}%`)
  },
  {
    title: '操作',
    render: (_, record) => h(ArButton, { onClick: () => process(record.fruit), size: 'mini' }, () => '确认')
  }
]
</script>

<style lang="less" scoped>
.table-wrap {
  padding: 40px 24px;
  background-color: var(--le-color-global-bg);
}
</style>
```

## API

### ArTable Props

| 名称       | 类型                                                     | 默认值  | 说明         | 必传 |
| ---------- | -------------------------------------------------------- | ------- | ------------ | ---- |
| columns    | `Partial<TColumnType>[]`                                 | `[]`    | 列配置       | N    |
| dataSource | `any[]`                                                  | `[]`    | 数据源       | N    |
| scroll     | `{ x?: string; y?: string }`                             | -       | 滚动长度     | N    |
| headFixed  | boolean                                                  | `false` | 固定头       | N    |
| border     | `boolean ` &#124; ` { row?: boolean; column?: boolean }` | `true`  | 配置边框显示 | N    |

### TColumnType

| 名称      | 类型                                              | 默认值       | 说明     | 必传 |
| --------- | ------------------------------------------------- | ------------ | -------- | ---- |
| title     | `string`                                          | -            | 标题     | N    |
| dataIndex | `string`                                          | -            | key      | N    |
| align     | `left ` &#124;`center ` &#124;`right `            | 文字布局方式 | N        |
| width     | `string`                                          | `string`     | 列宽度   | N    |
| sort      | `boolean`                                         | `false`      | 需要排序 | N    |
| render    | ` (val: any, record: Record<string, any>) => any` | -            | 渲染函数 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                         | 默认值                           | 描述                                            |
| ---------------------------- | -------------------------------- | ----------------------------------------------- |
| --le-table-border-radius     | 24px                             | 圆角                                            |
| --le-table-cell-padding      | 24px                             | 单元格内边距                                    |
| --le-table-font-size         | 24px                             | 文字大小                                        |
| --le-table-line-height       | 32px                             | 行高                                            |
| --le-table-sort-size         | 24px                             | 排序图标大小                                    |
| --le-table-cell-max-width    | 175px                            | 单元格默认最大宽度，可被 column 中的 width 覆盖 |
| --le-table-title-color       | `var(--le-color-secondary-text)` | 表头字体颜色                                    |
| --le-table-title-bg-color    | #fff                             | 表头背景颜色                                    |
| --le-table-title-font-weight | 500                              | 表头文字粗细                                    |
| --le-table-border-color      | `var(--le-color-disabled)`       | 边框颜色                                        |
| --le-table-body-color        | `var(--le-color-normal-text)`    | tbody 字体颜色                                  |
| --le-table-body-bg-color     | #fff                             | tbody 背景颜色                                  |

<!-- RAG SPLIT -->

# ArTag 标签

## 描述信息（When to use）

用于表明主体的类目，属性或状态

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <div class="tag-wrap">
    <ArTag type="primary">标签文字</ArTag>
    <ArTag type="light">标签文字</ArTag>
    <ArTag type="outline">标签文字</ArTag>
    <ArTag type="light-grey">标签文字</ArTag>
    <ArTag type="outline-grey">标签文字</ArTag>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.tag-wrap {
  padding: 24px;
  & > *:not(:last-child) {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
```

### 组件尺寸

```vue
<template>
  <div class="tag-wrap">
    <ArTag content="标签文字" size="extra-large"></ArTag>
    <ArTag content="标签文字" size="large"></ArTag>
    <ArTag content="标签文字" size="medium"></ArTag>
    <ArTag content="标签文字" size="small"></ArTag>
    <ArTag content="标签文字" size="mini"></ArTag>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.tag-wrap {
  padding: 24px;
  & > *:not(:last-child) {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
```

### 自定义组件

```vue
<template>
  <div class="tag-wrap">
    <ArTag color="#8046F4" type="primary" content="自定义颜色" />
    <ArTag color="#8046F4" type="light" content="自定义颜色" />
    <ArTag color="#8046F4" type="outline" content="自定义颜色" />
  </div>
  <div class="tag-wrap">
    <ArTag color="#C56D52" type="primary" content="自定义颜色" />
    <ArTag color="#C56D52" type="light" content="自定义颜色" />
    <ArTag color="#C56D52" type="outline" content="自定义颜色" />
  </div>
  <div class="tag-wrap">
    <ArTag content="交易" size="small" />
    <ArTag content="私教" size="small" />
    <ArTag content="团课" size="small" />
    <ArTag content="通知" size="small" />
    <ArTag content="会员" size="small" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.tag-wrap {
  padding: 24px;
  & > * {
    margin-right: 20px;

    &:nth-child(1) {
      --le-tag-primary-bg-color: #ffbd00;
    }
    &:nth-child(2) {
      --le-tag-primary-bg-color: #1751fa;
    }
    &:nth-child(3) {
      --le-tag-primary-bg-color: #ff5a20;
    }
    &:nth-child(4) {
      --le-tag-primary-bg-color: linear-gradient(180deg, #ff5a20 0%, #ff9343 100%);
    }
    &:nth-child(5) {
      --le-tag-primary-bg-color: linear-gradient(135deg, #ffc08f 0%, #e0814a 100%);
    }
  }
}
</style>
```

## API

### ArTag Props

| 名称    | 类型                                                                                  | 默认值    | 说明                                                                                                                                        | 必传 |
| ------- | ------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| type    | `primary ` &#124; `light` &#124; `outline` &#124; `light-grey` &#124; ` outline-grey` | `primary` | 类型                                                                                                                                        | N    |
| size    | `extra-large ` &#124; `large` &#124; `medium` &#124; `small` &#124; ` mini`           | `medium`  | 尺寸，对应设计稿`750`尺寸<p>`extra-large h-56px`</p><p>`large h-48px`</p> <p>`medium h-40px`</p> <p>`small h-32px`</p> <p>`mini h-28px`</p> | N    |
| color   | string                                                                                | `主题色`  | 标签主颜色，需为 hex 色值                                                                                                                   | N    |
| circle  | boolean                                                                               | `false`   | 圆角                                                                                                                                        | N    |
| content | string                                                                                | -         | 内容文字，与默认插槽效果一致                                                                                                                | N    |
| value   | `string ` &#124; ` number`                                                            | -         | 在 ArTagGroup 中 ArTag 使用的值                                                                                                             | N    |

### ArTag Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArTagGroup Props

| 名称         | 类型                                                    | 默认值       | 说明                  | 必传 |
| ------------ | ------------------------------------------------------- | ------------ | --------------------- | ---- |
| value        | `string[]` &#124; `number[]`                            | []           | 选中的值,支持 v-model | N    |
| defaultValue | `string[]` &#124; `number[]`                            | []           | 默认选中的值          | N    |
| activeType   | [`TArTagType`](http://localhost:18000/mobile.html#/tag) | `primary`    | 激活状态 ArTag 的类型 | N    |
| defaultType  | [`TArTagType`](http://localhost:18000/mobile.html#/tag) | `light-grey` | 默认状态 ArTag 的类型 | N    |
| multiply     | boolean                                                 | `false`      | 支持多选              | N    |
| maxCount     | `string` &#124; `number`                                | -            | 多选上限              | N    |

### ArTagGroup Events

| 名称       | 参数                          | 描述               |
| ---------- | ----------------------------- | ------------------ |
| change     | `(val: (string \| number)[])` | 点击时触发         |
| over-count | `(val: (string \| number)[])` | 多选超出上限时触发 |

### ArTagGroup Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                               | 默认值                           | 描述 |
| ---------------------------------- | -------------------------------- | ---- |
| --le-tag-primary-bg-color          | `var(--le-theme-color)`          |      |
| --le-tag-light-bg-color            | `var(--le-theme-light-color)`    |      |
| --le-tag-light-grey-bg-color       | `var(--le-color-global-bg)`      |      |
| --le-tag-outline-bg-color          | #fff                             |      |
| --le-tag-outline-grey-bg-color     | #fff                             |      |
| --le-tag-primary-color             | #fff                             |      |
| --le-tag-light-color               | `var(--le-theme-color)`          |      |
| --le-tag-outline-color             | `var(--le-theme-color)`          |      |
| --le-tag-light-grey-color          | `var(--le-color-secondary-text)` |      |
| --le-tag-outline-grey-color        | `var(--le-color-secondary-text)` |      |
| --le-tag-outline-border-color      | `var(--le-theme-color)`          |      |
| --le-tag-outline-grey-border-color | `var(--le-color-secondary-text)` |      |
| --le-tag-extra-large-height        | 56px                             |      |
| --le-tag-large-height              | 48px                             |      |
| --le-tag-medium-height             | 40px                             |      |
| --le-tag-small-height              | 32px                             |      |
| --le-tag-mini-height               | 28px                             |      |
| --le-tag-extra-large-font-size     | 24px                             |      |
| --le-tag-large-font-size           | 24px                             |      |
| --le-tag-medium-font-size          | 24px                             |      |
| --le-tag-small-font-size           | 20px                             |      |
| --le-tag-mini-font-size            | 18px                             |      |
| --le-tag-extra-large-border-radius | 8px                              |      |
| --le-tag-large-border-radius       | 8px                              |      |
| --le-tag-medium-border-radius      | 8px                              |      |
| --le-tag-small-border-radius       | 6px                              |      |
| --le-tag-mini-border-radius        | 6px                              |      |
| --le-tag-extra-large-padding       | 0 16px                           |      |
| --le-tag-large-padding             | 0 16px                           |      |
| --le-tag-medium-padding            | 0 8px                            |      |
| --le-tag-small-padding             | 0 8px                            |      |
| --le-tag-mini-padding              | 0 6px                            |      |

<!-- RAG SPLIT -->

# ArSwiper 轮播

## 描述信息（When to use）

用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="swiper-wrap">
    <ArSwiper autoplay :navigation="{ type: 'fraction', showControls: true }" @change="handleChange">
      <ArSwiperItem v-for="(item, index) in swiperList" :key="index">
        <img :src="item" class="img" />
      </ArSwiperItem>
    </ArSwiper>
  </div>
</template>
<script lang="ts" setup>
import { ArSwiperItem } from '@lefit/aries-ui'
const swiperList = new Array(6).fill(
  'https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0'
)
const handleChange = (index: number) => {
  console.log('change', index)
}
</script>

<style lang="less" scoped>
.swiper-wrap {
  margin: 0 24px 48px;
  border-radius: 24px;
  overflow: hidden;
}

img {
  display: block;
}
</style>
```

### 通栏模式

```vue
<template>
  <div class="swiper-wrap1">
    <ArSwiper
      :navigation="{
        type: 'dots',
        showControls: true,
        paginationPosition: 'bottom-right'
      }"
      banner
      auto-height
      @change="handleChange"
    >
      <ArSwiperItem v-for="(item, index) in swiperList" :key="index">
        <img :src="item" />
      </ArSwiperItem>
    </ArSwiper>
  </div>
</template>
<script lang="ts" setup>
import { ArSwiperItem } from '@lefit/aries-ui'
const swiperList = new Array(3)
  .fill(
    'https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0'
  )
  .concat([
    'https://quotefancy.com/media/wallpaper/3840x2160/1717110-T-Harv-Eker-Quote-How-you-do-anything-is-how-you-do-everything.jpg'
  ])
const handleChange = (index: number) => {
  console.log('change', index)
}
</script>

<style lang="less" scoped>
.swiper-wrap1 {
  margin-bottom: 24px;
  img {
    border-radius: 24px;
  }
}

img {
  display: block;
}
</style>
```

### 自定义使用

```vue
<template>
  <div class="swiper-wrap">
    <ArSwiper
      ref="swiperRef"
      v-model="current"
      :space-between="10"
      :navigation="{ type: 'dots' }"
      :slides-per-view="1.2"
      centered-slides
      effect="coverflow"
    >
      <ArSwiperItem v-for="(item, index) in swiperList" :key="index">
        <div class="item">
          {{ index }}
        </div>
      </ArSwiperItem>
    </ArSwiper>
  </div>
  <div class="btn">1. 调用Swiper实例方法</div>
  <div class="btn">
    <ArButton type="outline" @click="prev">上一页</ArButton>
    <ArButton type="outline" @click="slideTo">滚动到第三页</ArButton>
    <ArButton type="outline" @click="next">下一页</ArButton>
  </div>
  <div class="btn">2. v-model控制</div>
  <div class="btn">当前页码：{{ current }}</div>
  <div class="btns">
    <ArSpace wrap gap="0.24rem">
      <ArButton v-for="(_, index) in swiperList" :key="index" type="outline" @click="current = index"
        >跳至第{{ index }}页</ArButton
      >
    </ArSpace>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ArSwiperItem } from '@lefit/aries-ui'
const swiperList = new Array(6).fill(
  'https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0'
)

const swiperRef = ref()
const current = ref(0)

const prev = () => swiperRef.value?.prev()
const next = () => swiperRef.value?.next()
const slideTo = () => swiperRef.value?.slideTo(3)
</script>

<style lang="less" scoped>
.swiper-wrap {
  margin: 0 24px 48px;
  border-radius: 24px;
  overflow: hidden;
}

.item {
  width: 100%;
  height: 400px;
  background-color: #555;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  border-radius: 24px;
  overflow: hidden;
}

.btn {
  margin: 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btns {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
}
</style>
```

## API

### ArSwiper Props

| 名称           | 类型                                       | 默认值       | 说明                                        | 必传 |
| -------------- | ------------------------------------------ | ------------ | ------------------------------------------- | ---- |
| current        | number                                     | `0`          | 当前索引页，支持 v-model                    | N    |
| defaultCurrent | number                                     | `0`          | 默认索引页                                  | N    |
| autoplay       | `boolean ` &#124; ` TAutoplayConfig`       | `false`      | 自动播放配置                                | N    |
| speed          | number                                     | `300`        | 滑动动画时长                                | N    |
| height         | string                                     | -            | 轮播图高度                                  | N    |
| loop           | boolean                                    | `true`       | 是否循环播放                                | N    |
| autoHeight     | boolean                                    | `false`      | 高度自适应，但会造成一定的性能损耗          | N    |
| banner         | `boolean ` &#124; ` TBannerConfig`         | `false`      | 通栏配置                                    | N    |
| direction      | `horizontal ` &#124; ` vertical`           | `horizontal` | 滚动方向                                    | N    |
| allowTouchMove | boolean                                    | `true`       | 允许手动滑动                                | N    |
| navigation     | `TArSwiperNavigation`                      | `{}`         | 导航器配置                                  | N    |
| spaceBetween   | number                                     | `0`          | 每个轮播之间的间距                          | N    |
| slidesPerView  | `number ` &#124; ` auto`                   | `1`          | 每屏展示多少 slide                          | N    |
| centeredSlides | boolean                                    | `false`      | 活跃的 slide 居中                           | N    |
| effect         | `slide ` &#124; `fade` &#124; ` coverflow` | `slide`      | 过渡动画                                    | N    |
| noSwipingClass | string                                     | -            | swiper 中不触发 swiper 滚动的区域，接收类名 | N    |

### ArSwiper Events

| 名称   | 参数              | 描述       |
| ------ | ----------------- | ---------- |
| change | `(index: number)` | 变更时触发 |
| click  | `(index: number)` | 点击时触发 |

### ArSwiper Ref

| 名称    | 参数              | 描述         |
| ------- | ----------------- | ------------ |
| prev    |                   | 上一页       |
| next    |                   | 下一页       |
| slideTo | `(index: number)` | 滚动到某一页 |

### ArSwiper Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArSwiperItem Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### TAutoplayConfig

| 名称  | 类型     | 默认值 | 描述               |
| ----- | -------- | ------ | ------------------ |
| delay | `number` | 3000   | 自动播放的间隔时间 |

### TBannerConfig

| 名称    | 类型     | 默认值                            | 描述                 |
| ------- | -------- | --------------------------------- | -------------------- |
| padding | `string` | `var(--le-swiper-banner-padding)` | 通栏模式下两侧的边距 |

### TArSwiperNavigation

| 名称               | 类型                            | 默认值   | 描述                                   |
| ------------------ | ------------------------------- | -------- | -------------------------------------- |
| paginationPosition | `bottom ` &#124; `bottom-right` | `bottom` | 页码信息展示位置                       |
| showControls       | `boolean`                       | `false`  | 是否显示两侧的控制按钮                 |
| showPagination     | `boolean`                       | `true`   | 是否显示分页器                         |
| type               | `dots ` &#124; `fraction`       | `dots`   | 分页器类型，点状(dots)、分式(fraction) |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                        | 默认值             | 描述                 |
| --------------------------- | ------------------ | -------------------- |
| --le-swiper-button-size     | 40px               | 左右按钮尺寸         |
| --le-swiper-button-bg-color | rgba(0, 0, 0, 0.4) | 按钮背景颜色         |
| --le-swiper-navigation-gap  | 24px               | 导航控件离边缘的间距 |
| --le-swiper-banner-padding  | 24px               | 通栏模式下水平边距   |

<!-- RAG SPLIT -->

# ArGrid 宫格

## 描述信息（When to use）

用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口

## 使用示例（Examples）

### 基础宫格

```vue
<template>
  <div class="grid-wrap">
    <ArGrid column="3" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(3)"
        :key="index"
        text="主文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
    <ArGrid column="4" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(4)"
        :key="index"
        text="主文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
    <ArGrid column="5" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(5)"
        :key="index"
        text="主文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.grid-wrap {
  padding: 24px;
}

.grid-demo {
  margin-bottom: 24px;
  .le-grid-item:nth-child(n) {
    background-color: #cfcfcf;
  }
  .le-grid-item:nth-child(2n) {
    background-color: #efefef;
  }
}
</style>
```

### 带说明宫格

```vue
<template>
  <div class="grid-wrap">
    <ArGrid column="2" gap="0.1rem" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(4)"
        :key="index"
        text="主文案"
        layout="horizontal"
        description="辅助文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
    <ArGrid column="3" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(3)"
        :key="index"
        text="主文案"
        description="辅助文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
    <ArGrid column="4" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(4)"
        :key="index"
        text="主文案"
        description="辅助文案"
        image="https://img.leoao.com///mini.jpeg"
      >
      </ArGridItem>
    </ArGrid>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.grid-wrap {
  padding: 24px;
}

.grid-demo {
  margin-bottom: 24px;

  .le-grid-item:nth-child(n) {
    background-color: #cfcfcf;
  }
  .le-grid-item:nth-child(2n) {
    background-color: #efefef;
  }
}
</style>
```

### 带徽标，自定义图标

```vue
<template>
  <div class="grid-wrap">
    <ArGrid column="3" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(3)"
        :key="index"
        text="主文案"
        image="https://img.leoao.com///mini.jpeg"
        :badge-props="index === 0 ? { dot: true } : { content: `${index}个文字` }"
      >
      </ArGridItem>
    </ArGrid>
    <ArGrid column="4" class="grid-demo">
      <ArGridItem
        v-for="(_, index) in new Array(4)"
        :key="index"
        text="主文案"
        image="https://img.leoao.com///mini.jpeg"
        :badge-props="index === 0 ? { dot: true } : { content: index }"
      >
        <template #image><PictureIcon color="var(--le-theme-color)" /></template>
      </ArGridItem>
    </ArGrid>
  </div>
</template>

<script setup lang="ts">
import { PictureIcon } from '@lefit/aries-ui-icon'
</script>

<style lang="less">
.grid-wrap {
  padding: 24px;
}

.grid-demo {
  margin-bottom: 24px;
  .le-grid-item:nth-child(n) {
    background-color: #cfcfcf;
  }
  .le-grid-item:nth-child(2n) {
    background-color: #efefef;
  }
}
</style>
```

### 带间距、自定义宫格

```vue
<template>
  <div class="grid-wrap">
    <ArGrid column="0" gap="0.2rem" :style="{ overflowX: 'auto' }">
      <ArGridItem v-for="(_, index) in new Array(8)" :key="index">
        <div class="test">可滚动</div>
      </ArGridItem>
    </ArGrid>
    <ArGrid column="3" class="grid-demo" gap="0.2rem">
      <ArGridItem v-for="(_, index) in new Array(9)" :key="index">
        <div class="test" :style="{ width: '100%' }">自定义内容</div>
      </ArGridItem>
    </ArGrid>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.grid-wrap {
  padding: 24px;
}

.test,
.test-1 {
  height: 80px;
  width: 180px;
  background-color: var(--le-theme-color);
  color: #fff;
  border-radius: 8px;
  text-align: center;
  line-height: 80px;
}

.grid-demo {
  margin-top: 24px;
}
</style>
```

## API

### ArGrid Props

| 名称      | 类型                       | 默认值 | 说明                               | 必传 |
| --------- | -------------------------- | ------ | ---------------------------------- | ---- |
| gap       | string                     | -      | 间距，等效于 column-gap 和 row-gap | N    |
| rowGap    | string                     | -      | 行间距                             | N    |
| columnGap | string                     | -      | 列间距                             | N    |
| column    | `number ` &#124; ` string` | `1`    | 列数                               | N    |

### ArGridItem Props

| 名称        | 类型                             | 默认值     | 说明                | 必传 |
| ----------- | -------------------------------- | ---------- | ------------------- | ---- |
| text        | string                           | -          | 主文案              | N    |
| image       | string                           | -          | 图片地址            | N    |
| description | string                           | -          | 描述文案            | N    |
| layout      | `horizontal ` &#124; ` vertical` | `vertical` | 布局方式            | N    |
| badgeProps  | `Partial<BadgeProps>`            | -          | 透传至 badge 的参数 | N    |

### ArGrid Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArGridItem Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |
| image   | 图片插槽     |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArImage 图片

## 描述信息（When to use）

增强版的 img 标签，提供多种图片填充方式，并且支持图片懒加载

## 使用示例（Examples）

### 图片形状

```vue
<template>
  <div class="img-wrap">
    <ArSpace gap="0.24rem">
      <ArImage src="https://img.leoao.com///mini.jpeg" width="1.6rem" height="1.6rem"></ArImage>
      <ArImage src="https://img.leoao.com///mini.jpeg" width="1.6rem" height="1.6rem" radius="0.16rem"></ArImage>
      <ArImage src="https://img.leoao.com///mini.jpeg" width="1.6rem" height="1.6rem" circle></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.img-wrap {
  padding: 0 24px;
  display: flex;
}
</style>
```

### 图片填充

```vue
<template>
  <div class="img-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        class="img-container"
        fit="fill"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="cover"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="none"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="scale-down"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.img-wrap {
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.img-container {
  background-color: orange;
}
</style>
```

### 图片位置

```vue
<template>
  <div class="img-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        class="img-container"
        fit="contain"
        position="center"
        src="https://img.leoao.com///mini.jpeg"
        width="2rem"
        height="1.6rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        position="left"
        src="https://img.leoao.com///mini.jpeg"
        width="2rem"
        height="1.6rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        position="right"
        src="https://img.leoao.com///mini.jpeg"
        width="2rem"
        height="1.6rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        position="top"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        position="bottom"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
      <ArImage
        class="img-container"
        fit="contain"
        position="20px 20px"
        src="https://img.leoao.com///mini.jpeg"
        width="1.6rem"
        height="2rem"
      ></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.img-wrap {
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.img-container {
  background-color: orange;
}
</style>
```

### 图片懒加载

```vue
<template>
  <div class="img-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        width="7rem"
        height="4rem"
        lazy
        src="https://quotefancy.com/media/wallpaper/3840x2160/1717110-T-Harv-Eker-Quote-How-you-do-anything-is-how-you-do-everything.jpg"
      ></ArImage>
      <ArImage
        width="7rem"
        height="4.4rem"
        lazy
        src="https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0"
      ></ArImage>
      <ArImage
        width="7rem"
        height="4rem"
        lazy
        src="https://img.leoao.com/测试/10b93f830de3f1b71280242f307ab376.jpg"
      ></ArImage>
      <ArImage
        width="7rem"
        height="7rem"
        lazy
        src="https://img.leoao.com///mini.jpeg"
        @loaded="console.log('success')"
        @error="console.log('error')"
      ></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.img-wrap {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
}
</style>
```

## API

### ArImage Props

| 名称        | 类型                                                                       | 默认值   | 说明                                                                                           | 必传 |
| ----------- | -------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------- | ---- |
| src         | string                                                                     | -        | 图片地址                                                                                       | N    |
| alt         | string                                                                     | -        | 图片描述                                                                                       | N    |
| lazy        | boolean                                                                    | `false`  | 懒加载                                                                                         | N    |
| width       | string                                                                     | -        | 宽度, 考虑 CLS 优化请尽量设置                                                                  | N    |
| height      | string                                                                     | -        | 高度, 考虑 CLS 优化请尽量设置                                                                  | N    |
| circle      | boolean                                                                    | `false`  | 圆形                                                                                           | N    |
| radius      | string                                                                     | `0px`    | 圆角大小                                                                                       | N    |
| showLoading | boolean                                                                    | `false`  | 显示图片加载状态                                                                               | N    |
| showError   | boolean                                                                    | `true`   | 显示图片加载失败状态                                                                           | N    |
| fit         | `contain ` &#124; `cover` &#124; `fill` &#124; `none` &#124; ` scale-down` | `fill`   | 图片填充模式。可选项：contain,cover,fill,none,scale-down                                       | N    |
| position    | string                                                                     | `center` | 等同于原生的 object-position 属性，可选值为 center top right bottom left 或自定义 x,y 的偏移量 | N    |

### ArImage Events

| 名称   | 参数              | 描述             |
| ------ | ----------------- | ---------------- |
| loaded | `(e: MouseEvent)` | 图片加载完触发   |
| error  | `(e: MouseEvent)` | 图片加载错误触发 |

### ArImage Slots

| 名称    | 参数 | 描述                 |
| ------- | ---- | -------------------- |
| loading |      | 加载中的提示内容     |
| error   |      | 加载错误时的显示内容 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArImagePreview 图片预览

## 描述信息（When to use）

预览图片内容

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="preview-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        v-for="(item, index) in images"
        :key="item"
        :src="item"
        width="2rem"
        height="2rem"
        fit="contain"
        @click="indexChange(index)"
      ></ArImage>
    </ArSpace>
    <ArImagePreview v-model="visible" :images="images" :index="index" show-close></ArImagePreview>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const index = ref(0)
const images = [
  'https://quotefancy.com/media/wallpaper/3840x2160/1717110-T-Harv-Eker-Quote-How-you-do-anything-is-how-you-do-everything.jpg',
  'https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0',
  'https://img.leoao.com/测试/10b93f830de3f1b71280242f307ab376.jpg',
  'https://img.leoao.com///mini.jpeg'
]

const indexChange = (val: number) => {
  index.value = val
  visible.value = true
}
</script>

<style lang="less" scoped>
.preview-wrap {
  padding: 0 24px;
}
</style>
```

### 函数式调用 previewImage

```vue
<template>
  <div class="preview-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        v-for="(item, index) in images"
        :key="item"
        :src="item"
        width="2rem"
        height="2rem"
        fit="contain"
        @click="indexChange(index)"
      ></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { previewImage } from '@lefit/aries-ui'

const images = [
  'https://quotefancy.com/media/wallpaper/3840x2160/1717110-T-Harv-Eker-Quote-How-you-do-anything-is-how-you-do-everything.jpg',
  'https://ts1.cn.mm.bing.net/th/id/R-C.68acba813363129fdf562da9b1e4a3e9?rik=HyPZOB0zLHfPGQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f552878e64af02660a7a4fc3fc6fc6067eb04921e.jpg&ehk=5kXg1Vo%2bIM2DF1qntt%2b4eCnQ6E7KH0021pVz2HsW%2brg%3d&risl=&pid=ImgRaw&r=0',
  'https://img.leoao.com/测试/10b93f830de3f1b71280242f307ab376.jpg',
  'https://img.leoao.com///mini.jpeg'
]

const indexChange = (val: number) => {
  previewImage({ images, index: val, showClose: true, onClose: () => console.log('val', val) })
}
</script>

<style lang="less" scoped>
.preview-wrap {
  padding: 0 24px;
}
</style>
```

### 函数式调用 previewVideo

```vue
<template>
  <div class="preview-wrap">
    <ArSpace gap="0.24rem" wrap>
      <ArImage
        v-for="(item, index) in images"
        :key="item"
        :src="item"
        width="2rem"
        height="2rem"
        fit="contain"
        @click="indexChange(index)"
      ></ArImage>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { images } from './images'
import { previewVideo } from '@lefit/aries-ui'

const videos = [
  'https://img.leoao.com/FuimMiRsBdbx43oVr3OIG4uLSGPF',
  'https://img.leoao.com/FpRMlpdCOo8ugdTFgcTEKbtSXQTV'
]

const indexChange = (val: number) => {
  previewVideo({ url: videos[val], showClose: true })
}
</script>

<style lang="less" scoped>
.preview-wrap {
  padding: 0 24px;
}
</style>
```

## API

### ImagePreview Props

| 名称      | 类型                                                  | 默认值  | 说明                               | 必传 |
| --------- | ----------------------------------------------------- | ------- | ---------------------------------- | ---- |
| visible   | boolean                                               | `false` | 显示预览，支持 v-model             | N    |
| images    | `(string ` &#124; ` { type: string; url: string })[]` | `[]`    | 图片数组，type 支持 image 和 video | N    |
| index     | number                                                | `0`     | 当前图片索引                       | N    |
| showClose | boolean                                               | `false` | 展示关闭按钮                       | N    |

### ImagePreview Events

| 名称  | 参数 | 描述       |
| ----- | ---- | ---------- |
| close |      | 关闭时触发 |

### previewImage & previewVideo

可通过这两个方法预览图片或视频

```ts
import { previewImage, previewVideo } from '@lefit/aries-ui'
```

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArCountDown 倒计时

## 描述信息（When to use）

用于实时展示倒计时数值

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <div class="count-down">
    <ArCountDown :time="1000000" auto-start type="default"></ArCountDown>
    <ArCountDown :time="100000000" auto-start split-with-unit type="circle" format="DD天HH时mm时ss秒"></ArCountDown>
    <ArCountDown :time="1000000" auto-start type="block"></ArCountDown>
    <ArCountDown :time="1000000" auto-start split-with-unit type="light-text"></ArCountDown>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.count-down {
  padding: 0 24px;
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
```

### 毫秒级倒计时

```vue
<template>
  <div class="count-down">
    <ArCountDown :time="1000000" type="block" auto-start millisecond></ArCountDown>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.count-down {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
}
</style>
```

### 组件尺寸

```vue
<template>
  <div class="count-down-wrap">
    <div class="count-down">
      <ArCountDown :time="1000000" size="small" split-with-unit type="light-text"></ArCountDown>
      <ArCountDown :time="1000000" size="medium" split-with-unit type="light-text"></ArCountDown>
      <ArCountDown :time="1000000" size="large" split-with-unit type="light-text"></ArCountDown>
    </div>
    <div class="count-down">
      <ArCountDown :time="1000000" size="small" split-with-unit type="default"></ArCountDown>
      <ArCountDown :time="1000000" size="medium" split-with-unit type="default"></ArCountDown>
      <ArCountDown :time="1000000" size="large" split-with-unit type="default"></ArCountDown>
    </div>
    <div class="count-down">
      <ArCountDown :time="1000000" size="small" split-with-unit type="circle"></ArCountDown>
      <ArCountDown :time="1000000" size="medium" split-with-unit type="circle"></ArCountDown>
      <ArCountDown :time="1000000" size="large" split-with-unit type="circle"></ArCountDown>
    </div>
    <div class="count-down">
      <ArCountDown :time="1000000" size="small" split-with-unit type="block"></ArCountDown>
      <ArCountDown :time="1000000" size="medium" split-with-unit type="block"></ArCountDown>
      <ArCountDown :time="1000000" size="large" split-with-unit type="block"></ArCountDown>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.count-down {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 24px;
  }

  &-wrap {
    display: flex;
    flex-wrap: wrap;
    & > *:not(:last-child) {
      margin-bottom: 48px;
    }
  }
}
</style>
```

### 更多 format

```vue
<template>
  <div class="count-down">
    <div>以下均表示 100000 秒倒计时</div>
    <ArCountDown :time="100000000" auto-start type="block" format="ss秒"></ArCountDown>
    <ArCountDown :time="100000000" auto-start type="default" format="mm:ss"></ArCountDown>
    <ArCountDown :time="100000000" auto-start split-with-unit type="circle" format="HHmmss"></ArCountDown>
    <ArCountDown :time="100000000" auto-start type="block" format="DD靝HH時mm雰ss秒"></ArCountDown>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.count-down {
  padding: 0 24px;
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
```

### 自定义组件

```vue
<template>
  <div class="count-down">
    <ArCountDown :time="1000000000" split-with-unit format="DD天HH个小时以及mm分钟ss" auto-start>
      <template #default="{ times }">
        <span v-if="times">
          还剩 {{ times[0].value }} 天 {{ times[1].value }} 个小时以及 {{ times[2].value }} 分钟
          {{ times[3].value }} 秒啊！
        </span>
      </template>
    </ArCountDown>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.count-down {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
}
</style>
```

## API

### CountDown Props

| 名称          | 类型                                                           | 默认值     | 说明                                           | 必传 |
| ------------- | -------------------------------------------------------------- | ---------- | ---------------------------------------------- | ---- |
| autoStart     | boolean                                                        | `false`    | 自动开始倒计时                                 | N    |
| format        | string                                                         | `HH:mm:ss` | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | N    |
| time          | number                                                         | -          | 倒计时时长，单位毫秒                           | N    |
| millisecond   | boolean                                                        | `false`    | 开启毫秒级渲染                                 | N    |
| type          | `default ` &#124; `circle` &#124; `block` &#124; ` light-text` | `default`  | 类型                                           | N    |
| size          | `small ` &#124; `medium` &#124; ` large`                       | `medium`   | 尺寸                                           | N    |
| splitWithUnit | boolean                                                        | `false`    | 使用时间单位分割                               | N    |

### CountDown Events

| 名称   | 参数                                                                                            | 描述       |
| ------ | ----------------------------------------------------------------------------------------------- | ---------- |
| change | `(val: { day: number, hours: number, minutes: number, seconds: number, milliseconds: number })` | 倒计时触发 |
| finish |                                                                                                 | 结束时触发 |

### CountDown Slots

| 名称    | 参数                                                     | 描述         |
| ------- | -------------------------------------------------------- | ------------ |
| default | `({ times: {mask?: string, value?: number\|string}[] })` | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                 | 默认值                        | 描述                        |
| ------------------------------------ | ----------------------------- | --------------------------- |
| --le-countdown-default-color         | `var(--le-color-normal-text)` | default 类型文本颜色        |
| --le-countdown-light-text-time-color | #FF5A20                       | light-text 类型时间文字颜色 |
| --le-countdown-light-text-unit-color | `var(--le-color-normal-text)` | light-text 类型单位文字颜色 |
| --le-countdown-block-item-bg-color   | #FF5a20                       | block 类型时间背景色        |

<!-- RAG SPLIT -->

# ArNoticeBar 公告栏

## 描述信息（When to use）

在导航栏下方，用于给用户显示提示消息

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="notice-wrap">
    <ArSpace direction="column" gap="0.24rem">
      <ArNoticeBar content="这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀!">
        <template #left>
          <WarningIcon color="orange" />
        </template>
      </ArNoticeBar>

      <ArNoticeBar max-row="1" content="这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀!" color="#ff5a20">
        <template #right>
          <strong style="color: #1751fa"
            >查看详情<SortBaseIcon size="0.24rem" :style="{ transform: 'rotate(90deg)' }" />
          </strong>
        </template>
      </ArNoticeBar>

      <ArNoticeBar
        content="这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀这是一窜文本这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀!"
        max-row="2"
        :ellipsis-props="{
          collapseText: '收起',
          expandText: '展开'
        }"
      >
        <template #left>
          <WarningIcon color="orange" />
        </template>
        <template #right>
          <CloseIcon color="#444" />
        </template>
      </ArNoticeBar>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { WarningIcon, CloseIcon, SortBaseIcon } from '@lefit/aries-ui-icon'
</script>

<style lang="less" scoped>
.notice-wrap {
  display: flex;
  flex-direction: column;
}
</style>
```

### 滚动公告栏

```vue
<template>
  <div class="notice-wrap">
    <ArSpace direction="column" gap="0.24rem">
      <ArNoticeBar marquee content="适用于展示一条较长的文本，这是一条信息呀这是一条信息呀这是一条信息呀!">
        <template #left>
          <WarningIcon color="orange" />
        </template>
      </ArNoticeBar>

      <ArNoticeBar marquee direction="vertical" :content="list">
        <template #left>
          <WarningIcon color="orange" />
        </template>
      </ArNoticeBar>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { WarningIcon } from '@lefit/aries-ui-icon'
const list = [
  '世上只有Aries好',
  {
    content: '适用展示多条文本适用展示多条文本适用展示多条文本适用展示多条文本',
    color: 'skyblue'
  },
  {
    content: '适用展示多条文本',
    color: 'green'
  },
  {
    content: '这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀这是一条信息呀',
    color: 'var(--le-theme-color)'
  }
]
</script>

<style lang="less" scoped>
.notice-wrap {
  display: flex;
  flex-direction: column;
}
</style>
```

## API

### NoticeBar Props

| 名称          | 类型                                          | 默认值       | 说明                                                                          | 必传 |
| ------------- | --------------------------------------------- | ------------ | ----------------------------------------------------------------------------- | ---- |
| content       | `string ` &#124; `(string` &#124; ` VNode)[]` | -            | 公告栏内容                                                                    | N    |
| maxRow        | `number ` &#124; ` string`                    | -            | 显示最大行数，设置 marquee 时固定为 1                                         | N    |
| color         | string                                        | -            | 文案颜色                                                                      | N    |
| ellipsisProps | `Partial<EllipsisProps>`                      | -            | 省略配置                                                                      | N    |
| marquee       | `boolean ` &#124; ` TMarqueeType`             | `false`      | 跑马灯效果配置，speed 水平动画速度；loop 水平的循环播放；delay 水平动画延迟。 | N    |
| direction     | `horizontal ` &#124; ` vertical`              | `horizontal` | 滚动方向，设置 marquee 时生效                                                 | N    |

### TMarqueeType Props

| 名称  | 类型      | 默认值 | 说明                        | 必传 |
| ----- | --------- | ------ | --------------------------- | ---- |
| delay | `number`  | `0`    | 水平动画延迟                | N    |
| speed | `number`  | 50     | 水平动画滚动速度，单位 px/s | N    |
| loop  | `boolean` | `true` | 水平循环播放                | N    |

### NoticeBar Slots

| 名称    | 描述     |
| ------- | -------- |
| left    | 左侧插槽 |
| content | 内容插槽 |
| right   | 右侧插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                     | 默认值                        | 描述     |
| ------------------------ | ----------------------------- | -------- |
| --le-noticebar-bg-color  | `var(--le-theme-light-color)` | 背景色   |
| --le-noticebar-color     | `var(--le-color-normal-text)` | 字色     |
| --le-noticebar-icon-size | 36px                          | 图标尺寸 |

<!-- RAG SPLIT -->

# ArProgress 进度条

## 描述信息（When to use）

展示操作的当前进度

## 使用示例（Examples）

### 线型进度条

```vue
<template>
  <div class="progress-wrap">
    <div class="controller">
      <ArStepper v-model="current" min="0" max="100" step="10"></ArStepper>
      <ArButton size="small" type="light" @click="current = 0">0</ArButton>
      <ArButton size="small" type="light" @click="current = 30">30</ArButton>
      <ArButton size="small" type="light" @click="current = 60">60</ArButton>
      <ArButton size="small" type="light" @click="current = 100">100</ArButton>
    </div>
    <ArDivider gap="0.36rem" />
    <ArProgress type="line" :default-value="10"></ArProgress>
    <ArProgress type="line" :value="current"></ArProgress>
    <ArProgress type="plump" :default-value="10"></ArProgress>
    <ArProgress type="plump" :value="current" size="small"></ArProgress>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(50)
</script>

<style lang="less" scoped>
.progress-wrap {
  padding: 0 24px;

  .le-progress {
    margin-bottom: 24px;
  }
}
.controller {
  display: flex;
  justify-content: space-around;
}
</style>
```

### 环形进度条

```vue
<template>
  <div class="progress-wrap">
    <ArForm>
      <ArFormItem label="尺寸(px)">
        <div class="controller">
          <ArStepper v-model="size" min="40" max="200" step="5"></ArStepper>
          <ArButton size="small" type="light" @click="size = 50">50</ArButton>
          <ArButton size="small" type="light" @click="size = 100">100</ArButton>
        </div>
      </ArFormItem>
      <ArFormItem label="粗细(px)">
        <div class="controller">
          <ArStepper v-model="strokeWidth" min="0" max="20" step="1"></ArStepper>
          <ArButton size="small" type="light" @click="strokeWidth = 5">5</ArButton>
          <ArButton size="small" type="light" @click="strokeWidth = 10">10</ArButton>
        </div>
      </ArFormItem>

      <ArFormItem label="进度(%)">
        <div class="controller">
          <ArStepper v-model="current" min="0" max="100" step="1"></ArStepper>
          <ArButton size="small" type="light" @click="current = 25">25</ArButton>
          <ArButton size="small" type="light" @click="current = 50">50</ArButton>
          <ArButton size="small" type="light" @click="current = 75">75</ArButton>
        </div>
      </ArFormItem>
      <ArFormItem label="" content-align="right">
        <ArButton size="small" width="1.6rem" @click="reset">重置</ArButton>
      </ArFormItem>
    </ArForm>

    <div class="progress">
      <ArProgress type="circle" :stroke-width="computedWidth" :value="current" :size="computedSize"></ArProgress>
      <ArProgress type="circle" :value="current" size="1rem" stroke-width="0.1rem"></ArProgress>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'

const current = ref(30)
const strokeWidth = ref(5)
const size = ref(100)

const computedWidth = computed(() => strokeWidth.value / 50 + 'rem')
const computedSize = computed(() => size.value / 50 + 'rem')

const reset = () => {
  current.value = 30
  strokeWidth.value = 5
  size.value = 100
}
</script>

<style lang="less">
.progress-wrap {
  padding: 0 24px;

  .progress {
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.controller {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
```

### 顶点插槽

```vue
<template>
  <div class="progress-wrap">
    <div class="controller">
      <ArStepper v-model="current" min="0" max="100" step="10"> </ArStepper>
      <ArButton size="small" type="light" @click="current = 0">0</ArButton>
      <ArButton size="small" type="light" @click="current = 30">30</ArButton>
      <ArButton size="small" type="light" @click="current = 60">60</ArButton>
      <ArButton size="small" type="light" @click="current = 100">100</ArButton>
    </div>
    <ArDivider gap="0.5rem" />
    <ArProgress type="line" :show-progress-value="false" :value="current">
      <template #dot>
        <div class="demo-dot">
          <ArAvatar image="https://img.leoao.com///mini.jpeg" size="tiny" circle />
          <span>{{ current }}</span>
        </div>
      </template>
    </ArProgress>

    <ArDivider gap="0.36rem" color="transparent" />

    <ArProgress type="plump" :show-progress-value="false" :value="current" size="small">
      <template #dot>
        <div class="demo-dot">
          <ArAvatar image="https://img.leoao.com///mini.jpeg" size="mini" circle />
          <span>{{ current }}</span>
        </div>
      </template>
    </ArProgress>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(50)
</script>

<style lang="less" scoped>
.progress-wrap {
  padding: 0 24px;

  .le-progress {
    margin-bottom: 24px;
  }
}
.controller {
  display: flex;
  justify-content: space-around;
}
.demo-dot {
  position: relative;

  span {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    font-weight: bold;
    color: var(--le-theme-color);
  }
}
</style>
```

## API

### ArProgress Props

| 名称                | 类型                                    | 默认值 | 说明                             | 必传 |
| ------------------- | --------------------------------------- | ------ | -------------------------------- | ---- |
| type                | `line ` &#124; `plump` &#124; ` circle` | `line` | 类型，line 为线型，circle 为环形 | N    |
| size                | string                                  | -      | 环形进度条尺寸                   | N    |
| strokeWidth         | string                                  | -      | 进度条粗细                       | N    |
| value               | number                                  | -      | 进度值，单位 %                   | N    |
| defaultValue        | number                                  | `0`    | 默认进度值，单位 %               | N    |
| showArProgressValue | boolean                                 | `true` | 展示进度值                       | N    |

### ArProgress Slots

| 名称 | 描述                     |
| ---- | ------------------------ |
| dot  | 线型进度条的顶点内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                       | 默认值                     | 描述         |
| -------------------------- | -------------------------- | ------------ |
| --le-progress-bar-bg-color | `var(--le-color-disabled)` | 进度条底色   |
| --le-progress-bg-color     | #ff5a20                    | 进度条颜色   |
| --le-progress-duration     | 300ms                      | 过渡时间     |
| --le-progress-line-height  | 12px                       | 细进度条高度 |
| --le-progress-plump-height | 28px                       | 粗进度条高度 |

<!-- RAG SPLIT -->

# ArEllipsis 文本省略

## 描述信息（When to use）

展示空间不足时，隐去部分内容并用 ... 替代

## 使用示例（Examples）

### 单行文本省略

```vue
<template>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="start"
      content="q804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx3ummx"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="middle"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="end"
      content="q804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx3ummx"
    ></ArEllipsis>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.ellipsis-wrap {
  margin: 24px;
  padding: 24px;
  border-radius: 24px;
  background-color: #efefef;
  color: #2a2a2d;
}
</style>
```

### 多行文本省略

```vue
<template>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="2"
      placement="start"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="2"
      placement="middle"
      content="q804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx3ummxq804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="2"
      placement="end"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
    ></ArEllipsis>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.ellipsis-wrap {
  margin: 24px;
  padding: 24px;
  border-radius: 24px;
  background-color: #efefef;
  color: #2a2a2d;
}
</style>
```

### 额外文案

```vue
<template>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="start"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="middle"
      content="q804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx3ummxq804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      rows="1"
      placement="end"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      placement="start"
      rows="2"
      content="q804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx3ummxq804n9g8n34ygn49nfqc4x2u4g8c3n14g8y1nc3xy41mu048cucrn9y4ynx29ynmx034u0nx"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      placement="middle"
      rows="2"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
  <div class="ellipsis-wrap">
    <ArEllipsis
      placement="end"
      rows="2"
      content="这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本这是一窜文本"
      expand-text="展开"
      collapse-text="收起"
    ></ArEllipsis>
  </div>
</template>

<style lang="less" scoped>
.ellipsis-wrap {
  margin: 24px;
  padding: 24px;
  border-radius: 24px;
  background-color: #efefef;
  color: #2a2a2d;
}
</style>
```

## API

### ArEllipsis Props

| 名称         | 类型                                   | 默认值  | 说明     | 必传 |
| ------------ | -------------------------------------- | ------- | -------- | ---- |
| content      | string                                 | -       | 文本内容 | N    |
| placement    | `start ` &#124; `middle` &#124; ` end` | `end`   | 位置     | N    |
| rows         | `number ` &#124; ` string`             | -       | 文本行数 | N    |
| symbol       | string                                 | `'...'` | 省略符号 | N    |
| collapseText | string                                 | -       | 收起文本 | N    |
| expandText   | string                                 | -       | 展开文本 | N    |

### ArEllipsis Events

| 名称   | 参数                                   | 描述           |
| ------ | -------------------------------------- | -------------- |
| click  |                                        | 点击文本触发   |
| change | `(val: 'expand' \| 'collapse') => any` | 展开收起时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                     | 默认值                  | 描述             |
| ------------------------ | ----------------------- | ---------------- |
| --le-ellipsis-text-color | `var(--le-theme-color)` | 展开收起文案颜色 |

<!-- RAG SPLIT -->

# ArListPro 高级列表

## 描述信息（When to use）

高级列表

## 使用示例（Examples）

### 基本使用

```vue
<template>
  <div class="list-wrap">
    <ArListPro
      ref="listRef"
      class="list"
      :request="getList"
      use-empty
      :empty-props="{ description: '从此再无任何数据' }"
      use-pull-down-refresh
      first-full-screen-loading
    >
      <template #item="{ record, index }">
        <div class="item">{{ index + 1 }}</div>
      </template>
    </ArListPro>
    <ArFab :offset="{ left: '20px', bottom: '120px' }" @click="refresh">刷新</ArFab>
    <ArFab :offset="{ left: '20px' }" @click="clear">清空</ArFab>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchMemberList } from './api'
import { ListProProps } from '@lefit/aries-ui'

const getList: ListProProps['request'] = async (params: { currentPage: number }) => {
  const { currentPage = 1 } = params || {}
  const requestData = {
    // 其他参数
    bcMember: true
  }
  try {
    const res = await fetchMemberList({ requestData, page: { pageSize: 10, currentPage } })
    if (res?.code === 0) {
      return {
        data: res.data,
        success: true,
        total: res.page.count
      }
    } else {
      return {
        success: false
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const listRef = ref()
const refresh = () => {
  listRef.value?.refresh?.()
}

const clear = () => {
  listRef.value?.setDataSource?.([])
}
</script>

<style lang="less" scoped>
.list-wrap {
  height: 100%;
  background-color: #efefef;
  box-sizing: border-box;
}

.list {
  padding: 24px 24px 0;
}

.item {
  background-color: #fff;
  height: 140px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
```

### 使用控制器

通过 controller 插槽定制加载更多

```vue
<template>
  <div class="list-wrap">
    <ArListPro
      class="list"
      :request="getList"
      use-empty
      :empty-props="{ description: '从此再无任何数据' }"
      first-full-screen-loading
    >
      <template #item="{ record, index }">
        <div class="item">
          {{ index }}
        </div>
      </template>
      <template #controller="{ getMore }">
        <ArButton @click="getMore">加载更多</ArButton>
      </template>
    </ArListPro>
  </div>
</template>

<script setup lang="ts">
import { fetchMemberList } from './api'
import { type ListProProps } from '@lefit/aries-ui'

const getList: ListProProps['request'] = async (params: { currentPage: number }) => {
  const { currentPage = 1 } = params || {}
  const requestData = {
    // 其他参数
    bcMember: true
  }
  try {
    const res = await fetchMemberList({ requestData, page: { pageSize: 6, currentPage } })
    if (res?.code === 0) {
      return {
        data: res.data,
        success: true,
        total: res.page.count
      }
    } else {
      return {
        success: false
      }
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  height: 100%;
  background-color: #efefef;
  box-sizing: border-box;
}

.list {
  padding: 24px 24px 0;
}

.item {
  background-color: #fff;
  height: 140px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
```

## API

### ListPro Props

| 名称                   | 类型                                           | 默认值            | 说明                                                                                                   | 必传 |
| ---------------------- | ---------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | ---- |
| request                | `TRequestFn`                                   | -                 | 请求函数，[详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/listpro/types.ts) | N    |
| usePullDownRefresh     | boolean                                        | `false`           | 使用 pullDownRefresh                                                                                   | N    |
| pullDownRefreshProps   | `Omit<Partial<PullDownRefreshProps>, loading>` | `false`           | 透传至 pullDownRefresh                                                                                 | N    |
| useEmpty               | boolean                                        | -                 | 使用内置 empty                                                                                         | N    |
| emptyProps             | `Partial<EmptyProps>`                          | -                 | 覆盖内置 empty 配置                                                                                    | N    |
| firstFullScreenLoading | boolean                                        | `false`           | 首次请求使用全屏 Loading                                                                               | N    |
| loadingText            | string                                         | -                 | 加载时的显示文案                                                                                       | N    |
| loadingOverText        | string                                         | `我也是有底线的~` | 全部加载完毕时的显示文案                                                                               | N    |
| loadMoreDistance       | number                                         | `30`              | 加载更多时的触底距离                                                                                   | N    |
| mountFetch             | boolean                                        | `true`            | onMounted 时是否请求数据                                                                               | N    |

### ListPro Events

| 名称   | 参数           | 描述       |
| ------ | -------------- | ---------- |
| scroll | `(top:number)` | 滚动时触发 |

### ListPro Instance

| 名称          | 参数            | 描述                   |
| ------------- | --------------- | ---------------------- |
| refresh       |                 | 刷新列表，从第一页加载 |
| getDataSource |                 | 获取组件 dataSource    |
| setDataSource | `(data: any[])` | 修改组件 dataSource    |

### ListPro Slots

| 名称       | 参数                                              | 描述                 |
| ---------- | ------------------------------------------------- | -------------------- |
| item       | `{record: any, index: number, dataSource: any[]}` | ListItem 的 渲染 DOM |
| controller | `{getMore: () => void}`                           | 控制加载更多，如按钮 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                              | 默认值                           | 描述                   |
| --------------------------------- | -------------------------------- | ---------------------- |
| --le-list-pro-load-height         | 180px                            | load 区域整体高度      |
| --le-list-pro-load-text-color     | `var(--le-color-secondary-text)` | load 区域文字颜色      |
| --le-list-pro-load-text-font-size | 20px                             | load 区域文字大小      |
| --le-list-pro-loading-icon-gap    | 4px                              | loading 图标与文字间距 |
| --le-list-pro-loading-icon-height | 76px                             | loading 图标高度       |
| --le-list-pro-loading-icon-width  | 40px                             | loading 图标宽度       |

<!-- RAG SPLIT -->

# ArCollapse 折叠面板

## 描述信息（When to use）

可折叠的容器

## 使用示例（Examples）

### 假想场景

```vue
<template>
  <div class="collapse-wrap">
    <div class="class-wrap">
      <ArCollapse :collapse="isCollapse" collapse-height="2.4rem">
        <div v-for="item in data" :key="item.id" class="class-item">
          <ClassInfo :item="item" />
        </div>
      </ArCollapse>
      <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '0.24rem' }">
        <ArButton size="tiny" @click="clickHandler">
          <AngleDownIcon :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }" />
          {{ isCollapse ? '展开更多' : '收起' }}
        </ArButton>
      </div>
    </div>
  </div>

  <div class="collapse-wrap">
    <ArCollapse class="collapse-card" :show-arrow="false">
      <div v-if="!dataSource.length" class="loading">
        <ArLightLoadingIcon autoplay />
        <span>精彩即将呈现...</span>
      </div>
      <div v-else class="content">
        <TableCollaspseDemo :data-source="dataSource" />
      </div>
    </ArCollapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TableCollaspseDemo from './components/tableCollapse.vue'
import ClassInfo from '@/steps/demos/components/ClassInfo.vue'
import { ArLightLoadingIcon } from '@lefit/aries-ui'
import { AngleDownIcon } from '@lefit/aries-ui-icon'

const data = ref<any[]>([])
const dataSource = ref<any[]>([])

const isCollapse = ref(true)

const clickHandler = () => {
  isCollapse.value = !isCollapse.value
}

setTimeout(() => {
  dataSource.value = new Array(6).fill({ fruit: '香蕉', sweet: '83' })
}, 1000)

data.value = [
  {
    id: 1,
    date: '6月23日',
    week: '周三',
    status: {
      color: '#ABA7B6',
      content: '已完成'
    },
    className: '胸部训练',
    time: '19:00-20:00',
    coach: '小鱼儿',
    body: '训练部位：胸部'
  },
  {
    id: 2,
    date: '6月24日',
    week: '周四',
    status: {
      color: '#FF9B00',
      content: '待上课'
    },
    className: '胸部训练',
    time: '19:00-20:00',
    coach: '小鱼儿',
    body: '训练部位：胸部'
  },
  {
    id: 3,
    date: '6月25日',
    week: '周五',
    status: {
      color: '#3E8FFF',
      content: '待预约'
    },
    className: '胸部训练',
    time: '19:00-20:00',
    coach: '小鱼儿',
    body: '训练部位：胸部'
  }
]
</script>

<style lang="less" scoped>
.collapse-wrap {
  background-color: #f5f6f7;
  padding: 24px;
}

.loading {
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  span {
    font-size: 20px;
    margin-top: 8px;
    color: #aaa;
  }
}

.collapse-card {
  border-radius: 24px;
  background-color: #fff;
}

.class-wrap {
  background-color: #fff;
  padding: 24px;
  border-radius: 24px;

  .class-item {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}
</style>
```

### 基础使用

```vue
<template>
  <div class="collapse-wrap">
    <ArCollapse collapse collapse-height="0.8rem" expand-text="展开" collapse-text="收起">
      <div class="demo-wrap">
        <div class="demo-text">Title</div>
        <div v-for="(item, index) in new Array(4)" :key="index">一段平平无奇的内容说明细节关于废话的文案</div>
      </div>
    </ArCollapse>
  </div>

  <div class="collapse-wrap">
    <ArCollapse v-model="collapse" :collapse-height="40" collapse-text="收起" expand-text="查看全部目标" show-arrow>
      <div class="demo-wrap">
        <div class="demo-text">异步3s数据</div>
        <div v-for="(item, index) in dataSource" :key="index">一段平平无奇的内容说明细节关于废话的文案</div>
      </div>
    </ArCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const collapse = ref(false)

const dataSource = ref<any[]>([])

setTimeout(() => {
  dataSource.value = new Array(4)
}, 1000)
</script>

<style lang="less" scoped>
.collapse-wrap {
  background-color: #f5f6f7;
  padding: 24px;
}

.demo-wrap {
  line-height: 1.5;
  padding: 24px;
  background-color: #fff;
}

.demo-text {
  font-size: 24px;
  font-weight: bold;

  & + div {
    margin-top: 24px;
  }
}
</style>
```

### 组件实例方法

```vue
<template>
  <div class="collapse-wrap">
    <ArSpace gap="0.24rem" style="margin-bottom: 0.24rem">
      <ArButton size="small" @click="collapseRef.collapse()">收起</ArButton>
      <ArButton size="small" @click="collapseRef.expand()">展开</ArButton>
    </ArSpace>
    <ArCollapse ref="collapseRef" collapse-height="40px" collapse-text="收起" expand-text="查看全部目标">
      <div class="demo-wrap">
        <div class="demo-text">Title</div>
        <div v-for="(item, index) in new Array(8)" :key="index">一段平平无奇的内容说明细节关于废话的文案</div>
      </div>
    </ArCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapseRef = ref()
</script>

<style lang="less" scoped>
.collapse-wrap {
  background-color: #f5f6f7;
  padding: 24px;
}

.demo-wrap {
  line-height: 1.5;
  padding: 24px;
  background-color: #fff;
}

.demo-text {
  font-size: 24px;
  font-weight: bold;
  & + div {
    margin-top: 24px;
  }
}
</style>
```

### 禁用折叠

```vue
<template>
  <div class="collapse-wrap">
    <ArCollapse collapse collapse-height="0.8rem" expand-text="展开" collapse-text="收起" disabled>
      <div class="demo-wrap">
        <div class="demo-text">Title</div>
        <div v-for="(item, index) in new Array(4)" :key="index">一段平平无奇的内容说明细节关于废话的文案</div>
      </div>
    </ArCollapse>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.collapse-wrap {
  background-color: #f5f6f7;
  padding: 24px;
}

.class-wrap {
  background-color: #fff;
  padding: 24px;
  border-radius: 24px;

  .class-item {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}

.demo-wrap {
  line-height: 1.5;
  padding: 24px;
  background-color: #fff;

  .demo-text {
    font-size: 24px;
    font-weight: bold;

    & + div {
      margin-top: 24px;
    }
  }
}
</style>
```

## API

### ArCollapse Props

| 名称                   | 类型                       | 默认值  | 说明                           | 必传 |
| ---------------------- | -------------------------- | ------- | ------------------------------ | ---- |
| collapseHeight         | `string ` &#124; ` number` | -       | 折叠时高度，支持数字、px、rem  | N    |
| expandHeight           | `string ` &#124; ` number` | -       | 展开时高度，支持数字、px、rem  | N    |
| collapseChildrenNumber | number                     | -       | 折叠时显示 children 节点的数量 | N    |
| showArrow              | boolean                    | `false` | 显示展开/折叠箭头              | N    |
| collapse               | boolean                    | `false` | 折叠状态，支持 v-model         | N    |
| collapseText           | string                     | -       | 折叠时展示的文案               | N    |
| expandText             | string                     | -       | 展开是展示的文案               | N    |
| disabled               | boolean                    | `false` | 禁用折叠                       | N    |

### ArCollapse Events

| 名称     | 参数 | 描述       |
| -------- | ---- | ---------- |
| collapse |      | 收起时触发 |
| expand   |      | 展开时触发 |

### ArCollapse Ref Methods

| 名称     | 参数 | 描述     |
| -------- | ---- | -------- |
| collapse |      | 触发收起 |
| expand   |      | 触发展开 |
| update   |      | 触发刷新 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                    | 默认值  | 描述           |
| ----------------------- | ------- | -------------- |
| --le-collapse-duration  | 300ms   | 动画时间       |
| --le-collapse-color     | #8A8697 | 箭头和文案颜色 |
| --le-collapse-font-size | 22px    | 箭头和文案尺寸 |

<!-- RAG SPLIT -->

# ArSlide 滑块

## 描述信息（When to use）

组件描述

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <ArSlide></ArSlide>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
```

## API

### ArSlide Props

| 名称 | 类型 | 默认值 | 说明 | 必传 |
| ---- | ---- | ------ | ---- | ---- |

### ArSlide Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| click | `(e: MouseEvent)` | 点击时触发 |

### ArSlide Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# ArLoading 加载

## 描述信息（When to use）

用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感

## 使用示例（Examples）

### 在模板中使用

text 设置文本，默认为空；visible 控制组件是否显示；showOverlay 控制组件是否存在蒙层

```vue
<template>
  <div class="loading-row">
    <div class="icon-box">
      <ArLightLoadingIcon autoplay />
    </div>
    <div class="icon-box">
      <ArDarkLoadingIcon autoplay />
    </div>
  </div>
  <div class="loading-row">
    <ArButton :loading="no_mask" @click="showLoading1">无遮罩</ArButton>
    <ArButton :loading="mask" @click="showLoading2">有遮罩</ArButton>
  </div>
  <ArLoading text="加载中" :visible="no_mask"></ArLoading>
  <ArLoading text="加载中" show-overlay :visible="mask"></ArLoading>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const no_mask = ref(false)
const mask = ref(false)

const showLoading1 = () => {
  no_mask.value = true
  setTimeout(() => {
    no_mask.value = false
  }, 3600)
}
const showLoading2 = () => {
  mask.value = true
  setTimeout(() => {
    mask.value = false
  }, 3600)
}
</script>
```

### 组件 Hook

使用 useLoading 创建 loading 实例，配置参数参考 API

```vue
<template>
  <div class="loading-row">
    <ArButton :loading="btn1" @click="loadingHook1">无遮罩</ArButton>
    <ArButton @click="loadingHook2">有遮罩</ArButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useLoading } from '@/index'

const loading1 = useLoading('loading')
const loading2 = useLoading({
  text: '加载中',
  showOverlay: true
})

const btn1 = ref(false)
const loadingHook1 = () => {
  loading1.show()
  btn1.value = true
  setTimeout(() => {
    loading1.hide()
    btn1.value = false
  }, 3600)
}

const loadingHook2 = () => {
  loading2.show()
  setTimeout(() => {
    loading2.hide()
  }, 3600)
}
</script>
```

## API

### ArLoading Props

| 名称         | 类型                                   | 默认值      | 说明           | 必传 |
| ------------ | -------------------------------------- | ----------- | -------------- | ---- |
| visible      | boolean                                | `true`      | 是否显示       | N    |
| text         | string                                 | `加载中...` | 加载文案       | N    |
| showOverlay  | boolean                                | `false`     | 是否显示遮罩层 | N    |
| overlayProps | `Partial<Omit<OverlayProps, visible>>` | `{}`        | 透传至 overlay | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                        | 默认值                           | 描述             |
| --------------------------- | -------------------------------- | ---------------- |
| --le-loading-color          | `var(--le-color-secondary-text)` | 文字颜色         |
| --le-loading-icon-gap       | 8px                              | 图标与文案的间距 |
| --le-loading-light-color    | `var(--le-color-secondary-text)` | 亮色字体         |
| --le-loading-dark-color     | `var(--le-color-weak-text)`      | 暗色字体         |
| --le-loading-text-font-size | 20px                             |                  |
| --le-loading-zindex         | 900                              | 层级             |

<!-- RAG SPLIT -->

# ArOverlay 遮罩层

## 描述信息（When to use）

通过遮罩层，可以强调部分内容

## 使用示例（Examples）

### 组件类型

```vue
<template>
  <div class="overlay-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArButton block type="outline" @click="visible1 = true">遮罩层</ArButton>
      <ArButton block type="outline" @click="visible2 = true">自定义遮罩层</ArButton>
    </ArSpace>
  </div>
  <ArOverlay :visible="visible1" @click="visible1 = false"></ArOverlay>
  <ArOverlay
    :visible="visible2"
    :duration="1000"
    background="rgba(255,85,32,0.67)"
    @click="visible2 = false"
  ></ArOverlay>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
</script>

<style scoped lang="less">
.overlay-row {
  display: flex;
  flex-direction: column;
}
</style>
```

## API

### ArOverlay Props

| 名称       | 类型    | 默认值                | 说明                     | 必传 |
| ---------- | ------- | --------------------- | ------------------------ | ---- |
| visible    | boolean | `false`               | 是否显示遮罩层           | N    |
| zIndex     | number  | `900`                 | 层级                     | N    |
| background | string  | `rgba(0, 0, 0, 0.70)` | 背景色                   | N    |
| duration   | number  | `300`                 | 动画时长                 | N    |
| top        | string  | `0`                   | 遮罩层距离屏幕顶部的距离 | N    |
| bottom     | string  | `0`                   | 遮罩层距离屏幕底部的距离 | N    |
| left       | string  | `0`                   | 遮罩层距离屏幕左侧的距离 | N    |
| right      | string  | `0`                   | 遮罩层距离屏幕右侧的距离 | N    |

### ArOverlay Events

| 名称   | 参数              | 描述               |
| ------ | ----------------- | ------------------ |
| click  | `(e: MouseEvent)` | 点击时触发         |
| open   | `(dom: Element)`  | 打开遮罩时触发     |
| opened | `(dom: Element)`  | 遮罩打开结束时触发 |
| close  | `(dom: Element)`  | 关闭遮罩时触发     |
| closed | `(dom: Element)`  | 遮罩关闭时触发     |

### ArOverlay Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                  | 默认值              | 描述                     |
| --------------------- | ------------------- | ------------------------ |
| --le-overlay-bg-color | rgba(0, 0, 0, 0.70) | 背景颜色                 |
| --le-overlay-duration | 300ms               | 动画时间                 |
| --le-overlay-zindex   | 900                 | 层级                     |
| --le-overlay-top      | 0                   | 遮罩层距离屏幕边缘的距离 |
| --le-overlay-bottom   | 0                   |                          |
| --le-overlay-left     | 0                   |                          |
| --le-overlay-right    | 0                   |                          |

<!-- RAG SPLIT -->

# ArToast 轻提示

## 描述信息（When to use）

用于轻量级反馈或提示，不会打断用户操作

## 使用示例（Examples）

### 基本使用

通过 useToast 创建 toast 方法，placement 控制三个弹出位置：top、center、bottom（default）

```vue
<template>
  <div class="toast-row">
    <ArSpace direction="column" gap="0.24rem" fill>
      <ArButton block @click="top">Top</ArButton>
      <ArButton block @click="center">Center</ArButton>
      <ArButton block @click="bottom">Bottom</ArButton>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/index'
const toast = useToast()
const closeHandler = () => console.log('close')

const top = () => {
  toast({
    title: '提示',
    placement: 'top',
    message: '已提交成功',
    iconSrc: 'https://img.leoao.com/sparkle/完成.png',
    onClose: closeHandler
  })
}
const center = () => {
  toast('提交成功')
}
const bottom = () => {
  toast({
    placement: 'bottom',
    title: '提示',
    message: '啊电话费阿卡丽拒收到付啊电话费阿卡丽拒收到付',
    onClose: closeHandler
  })
}
</script>

<style lang="less">
.toast-row {
  padding: 0 20px;
}
</style>
```

## API

### ArToast Props

| 名称      | 类型                                    | 默认值     | 说明                 | 必传 |
| --------- | --------------------------------------- | ---------- | -------------------- | ---- |
| title     | string                                  | -          | 提示标题             | N    |
| message   | string                                  | `提示文案` | 提示内容             | N    |
| duration  | number                                  | `2000`     | 持续显示时间         | N    |
| placement | `top ` &#124; `center` &#124; ` bottom` | `center`   | 弹出位置             | N    |
| iconSrc   | string                                  | -          | 标题图标             | N    |
| width     | string                                  | -          | 宽度, 默认内容区撑开 | N    |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                           | 默认值                  | 描述           |
| ------------------------------ | ----------------------- | -------------- |
| --le-toast-zIndex              | 1000                    | 层级           |
| --le-toast-max-width           | 550px                   | 最大长度       |
| --le-toast-padding             | 32px 48px               | ArToast 内边距 |
| --le-toast-bg-color            | rgba(0, 0, 0, 0.8)      | 背景颜色       |
| --le-toast-color               | `var(--le-color-white)` | 字体颜色       |
| --le-toast-message-font-size   | 28px                    |                |
| --le-toast-title-font-size     | 32px                    |                |
| --le-toast-title-margin-bottom | 16px                    | 标题与文案间距 |
| --le-toast-title-icon-gap      | 8px                     | 图标与标题间距 |
| --le-toast-icon-size           | 40px                    | 图标尺寸       |
| --le-toast-border-radius       | 16px                    | 圆角           |
| --le-toast-top-gap             | 145px                   | 顶部间距       |
| --le-toast-bottom-gap          | 180px                   | 底部间距       |

<!-- RAG SPLIT -->

# ArPopup 弹出层

## 描述信息（When to use）

由其他控件触发，屏幕滑出或弹出一块自定义内容区域

## 使用示例（Examples）

#### 注意：

在使用 Popup 组件时，因为 Teleport，内部的 DOM 会定位到 body 同级，此时内部 DOM 的 class 可能失效(less 嵌套中较容易出现)，但不用害怕，它们仍存在同一个 style-scoped 作用域中，你可以在 style 中的最外层书写你的 css。

```vue
<template>
  <div class="popup-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArButton block type="outline" @click="left = true">Left</ArButton>
      <ArButton block type="outline" @click="right = true">Right</ArButton>
      <ArButton block type="outline" @click="top = true">Top</ArButton>
      <ArButton block type="outline" @click="bottom = true">Bottom</ArButton>
      <ArButton block type="outline" @click="center = true">Center</ArButton>
    </ArSpace>
  </div>

  <ArPopup v-model="left" placement="left" close-on-overlay-click>
    <div class="left">测试文字</div>
  </ArPopup>
  <ArPopup v-model="right" placement="right" @click-overlay="right = false">
    <div class="right">测试文字</div>
  </ArPopup>
  <ArPopup v-model="top" placement="top" close-on-overlay-click>
    <div class="top">测试文字</div>
  </ArPopup>
  <ArPopup v-model="bottom" placement="bottom" close-on-overlay-click>
    <div class="bottom">测试文字</div>
  </ArPopup>
  <ArPopup v-model="center" placement="center" close-on-overlay-click>
    <div class="center">测试文字</div>
  </ArPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const left = ref(false)
const right = ref(false)
const top = ref(false)
const bottom = ref(false)
const center = ref(false)
</script>

<style lang="less" scoped>
.popup-row {
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
}

.left,
.right {
  width: 5rem;
  height: 100%;
}

.top,
.bottom {
  height: 6rem;
}

.center {
  width: 6rem;
  height: 6rem;
}
</style>
```

### 基本使用

作为一个容器，placement 控制 5 个弹出方向：top、bottom、left、right、center

```vue
<template>
  <div class="popup-row">
    <ArButton block type="outline" @click="visible = true">关闭时销毁DOM</ArButton>
  </div>

  <ArPopup
    :visible="visible"
    :close-on-overlay-click="true"
    destroy-on-close
    :safe-bottom="false"
    placement="bottom"
    background="transparent"
    @click-overlay="closePopup"
  >
    <div class="task-center-popup">
      <div class="task-center-popup-header" @click="closePopup">
        <img
          class="close-icon"
          src="https://res.leoao.com/promotion/1708997443452_0yzigo9ltpnk.png"
          alt=""
          @click="closePopup"
        />
      </div>
      <div class="task-center-popup-content">
        <div class="task-center-popup-content-title">乐币广场</div>
        <div class="task-center-popup-content-body">
          <template v-if="goodAdList.length">
            <div v-for="(item, index) in goodAdList" :key="index" class="task-center-popup-content-body-item">
              <img :src="item.pictureUrl" alt="" />
              <p>{{ item.name }}</p>
            </div>
          </template>
          <div v-else class="empty-icon">
            <img src="https://img.leoao.com/promotion/1729838741590_wdb1gqbofm8.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </ArPopup>
</template>
<script setup lang="ts" name="CoinsPlazaPopup">
import { ArPopup } from '@lefit/aries-ui'
import { reactive, ref } from 'vue'

const visible = ref(false)

const goodAdList = reactive([
  {
    advertisePlaceId: '1060915513385000960',
    extraPictureUrl: null,
    brandArray: null,
    pictureUrl: 'https://res.leoao.com/13916/1732006304214_编组 12@3x.png',
    linkUrl: 'https://datasink.leoao.com/t/5Yo',
    name: '福利官好礼',
    subhead: null,
    concernment: 998,
    colorType: null,
    boxTemplatePlace: '1'
  },
  {
    advertisePlaceId: '1061279346767142912',
    extraPictureUrl: null,
    brandArray: null,
    pictureUrl: 'https://res.leoao.com/13916/1732006333670_编组 13@3x.png',
    linkUrl: 'https://h5.leoao.com/promotion/my-sports-challenge.html#/index',
    name: '运动挑战赛',
    subhead: null,
    concernment: 997,
    colorType: null,
    boxTemplatePlace: '1'
  },
  {
    advertisePlaceId: '1061284932476968960',
    extraPictureUrl: null,
    brandArray: null,
    pictureUrl: 'https://res.leoao.com/13916/1732006321711_编组 11@3x.png',
    linkUrl: 'https://h5.leoao.com/mobile/activity/list/index?activityType=6',
    name: '完赛送乐币',
    subhead: null,
    concernment: 996,
    colorType: null,
    boxTemplatePlace: '1'
  }
])

const closePopup = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.popup-row {
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
}
.task-center-popup {
  position: relative;
  &-header {
    width: 100%;
    height: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-img {
      width: 5.2rem;
      height: 2.24rem;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -2.6rem;
      z-index: 10;
    }
    .close-icon {
      width: 0.62rem;
      height: 0.62rem;
      position: absolute;
      top: 0.12rem;
      right: 0.24rem;
      z-index: 10;
    }
  }

  &-content {
    position: relative;
    width: calc(100% - 0.32rem);
    display: flex;
    flex-direction: column;
    padding: 0.32rem 0 0.32rem 0.32rem;
    height: 2.96rem;
    background: linear-gradient(313deg, #ffffff 0%, #f8eaf8 100%), #feeee4;
    border-radius: 0.36rem 0.36rem 0 0;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3.23rem;
      height: 2.55rem;
      background: #ffb09e;
      opacity: 0.31;
      z-index: 0;
      filter: blur(45px);
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 3.08rem;
      height: 4.55rem;
      background: #d4b5ff;
      opacity: 0.1;
      z-index: 0;
      filter: blur(45px);
    }

    &-title {
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 0.32rem;
      color: #2a2a2d;
      line-height: 0.45rem;
      text-align: left;
      font-style: normal;
    }
    &-body {
      position: relative;
      z-index: 10;
      width: calc(100% + 0.12rem);
      margin-top: 0.22rem;
      margin-left: -0.12rem;
      display: flex;
      justify-content: flex-start;
      overflow-y: hidden;
      overflow-x: auto;
      // chrome 和Safari
      &::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
        color: transparent;
      }
      &-item {
        flex-shrink: 0;
        margin-right: 0.02rem;
        flex-shrink: 0;
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0.36rem;
          border: 0.02rem solid #ffffff;
        }
        p {
          width: 1.5rem;
          margin-top: 0.08rem;
          font-weight: 400;
          font-size: 0.24rem;
          color: #2a2a2d;
          line-height: 0.33rem;
          text-align: center;
          font-style: normal;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:last-child {
          margin-right: 0.12rem;
        }
      }
    }
    .empty-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100vw - 0.32rem);
      padding-right: 0.32rem;
      img {
        width: 2.1rem;
        height: 2.1rem;
      }
    }
  }
}
</style>
```

### 特殊情境

一些特殊情境需定制化宽度和背景色之类的，请使用特定属性

```vue
<template>
  <div class="popup-row">
    <ArSpace direction="column" gap="0.24rem">
      <ArButton block type="outline" @click="toolbar = true">结合ArPopupToolBar </ArButton>
      <ArButton block type="outline" @click="common = true">自定义样式</ArButton>
    </ArSpace>
  </div>

  <ArPopup v-model="toolbar" placement="bottom" close-on-overlay-click>
    <ArPopupToolBar
      type="operation"
      cancel-text="点击取消"
      title="测试"
      @cancel="toolbar = false"
      @confirm="toolbar = false"
    />
    <div class="bottom">测试文字</div>
  </ArPopup>

  <ArPopup v-model="common" placement="center" close-on-overlay-click background="#eee">
    <ArPopupToolBar type="tips" title="是否解绑当前门店?" @close="common = false" />
    <div class="center">测试文字</div>
  </ArPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const common = ref(false)
const toolbar = ref(false)
</script>

<style lang="less" scoped>
.popup-row {
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
}

.center {
  width: 100vw;
  height: 6rem;
}

.bottom {
  height: 6rem;
}
</style>
```

## API

### ArPopup Props

| 名称                | 类型                                                                 | 默认值   | 说明                       | 必传 |
| ------------------- | -------------------------------------------------------------------- | -------- | -------------------------- | ---- |
| visible             | boolean                                                              | `false`  | 是否显示浮层, 支持 v-model | N    |
| placement           | `left ` &#124; `right` &#124; `top` &#124; `bottom` &#124; ` center` | `center` | 浮层呈现位置               | N    |
| closeOnOverlayClick | boolean                                                              | `false`  | 是否点击遮罩层关闭浮层     | N    |
| overlayProps        | `Partial<Omit<OverlayProps, visible>>`                               | -        | 透传至遮罩层的 props       | N    |
| zIndex              | number                                                               | `900`    | 层级                       | N    |
| background          | string                                                               | `#fff`   | 背景色属性                 | N    |
| safeBottom          | boolean                                                              | `true`   | 安全底部                   | N    |
| destroyOnClose      | boolean                                                              | `false`  | 关闭时销毁 DOM             | N    |
| lazyRender          | boolean                                                              | `true`   | 内容在初次弹出时挂载       | N    |

### ArPopup Events

| 名称          | 参数              | 描述               |
| ------------- | ----------------- | ------------------ |
| open          | `(dom: Element)`  | 打开动画开始时触发 |
| opened        | `(dom: Element)`  | 打开动画结束时触发 |
| close         | `(dom: Element)`  | 关闭动画开始时触发 |
| closed        | `(dom: Element)`  | 关闭动画结束时触发 |
| click-overlay | `(e: MouseEvent)` | 点击遮罩时触发     |

### ArPopup Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### ArPopupToolBar Props

| 名称        | 类型                      | 默认值 | 说明     | 必传 |
| ----------- | ------------------------- | ------ | -------- | ---- |
| type        | `tips` &#124; `operation` | `tips` | 类型     | N    |
| cancelText  | `string`                  | `取消` | 取消文案 | N    |
| title       | `string`                  | -      | 标题     | N    |
| confirmText | `string`                  | `确认` | 确认文案 | N    |

### ArPopupToolBar Events

| 名称    | 参数 | 描述               |
| ------- | ---- | ------------------ |
| cancel  |      | 点击取消时触发     |
| confirm |      | 点击确认时触发     |
| close   |      | 点击关闭按钮时触发 |

### ArPopupToolBar Slots

| 名称    | 描述         |
| ------- | ------------ |
| cancel  | 取消区域插槽 |
| title   | 标题插槽     |
| confirm | 确认区域插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

<div style="color: red;">!!!注意：自定义请参考background、zIndex属性</div>

| 名称                             | 默认值                           | 描述           |
| -------------------------------- | -------------------------------- | -------------- |
| --le-popup-zindex                | 900                              | 层级           |
| --le-popup-content-bg-color      | #fff                             | 内容区背景颜色 |
| --le-popup-toolbar-height        | 104px                            | toolbar 高度   |
| --le-popup-toolbar-cancel-color  | `var(--le-color-secondary-text)` | 取消字体颜色   |
| --le-popup-toolbar-confirm-color | `var(--le-theme-color)`          | 确定字体颜色   |
| --le-popup-toolbar-close-color   | `var(--le-color-normal-text)`    | 关闭按钮的颜色 |

<!-- RAG SPLIT -->

# ArDialog 对话框

## 描述信息（When to use）

一种打断当前操作的模态视图，用于显示重要提示或请求用户进行重要操作

## 使用示例（Examples）

### 组件 Hook

推荐使用 hook 形式创建对话框，对话框弹出形式有 4 种：alert、confirm、input、image，详细配置参考 API

```vue
<template>
  <div class="dialog-row">
    <ArButton block type="outline" @click="alert">Alert</ArButton>
    <ArButton block type="outline" @click="confirm">Confirm</ArButton>
    <ArButton block type="outline" @click="input">Input</ArButton>
    <ArButton block type="outline" @click="image">Image</ArButton>
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/index'
const dialog = useDialog()

const alert = () => {
  dialog.alert({
    closeOnOverlayClick: true,
    message: '这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示'
  })
}

const confirm = () => {
  dialog.confirm({
    closeOnOverlayClick: true,
    message:
      '这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示',
    onCancel: (val) => console.log('cancel', val),
    onConfirm: (val) => console.log('confirm', val)
  })
}

const input = () => {
  dialog.input({
    message: '这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示',
    onInputChange: (val) => console.log(val),
    onCancel: (val) => console.log('cancel', val),
    onConfirm: (val) => console.log('confirm', val)
  })
}

const image = () => {
  dialog.image({
    message: '这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示',
    imageSrc: 'https://img.leoao.com/测试/10b93f830de3f1b71280242f307ab376.jpg',
    imageAlign: 'top'
  })
}
</script>
```

### 组件插槽

message 插槽用于自定义信息内容；当弹出类型为 input 时，通过模板书写的组件可以自定义 button 插槽，并暴露一个获取 input 值的方法 getValue

```vue
<template>
  <div class="dialog-row">
    <ArButton block type="outline" @click="visibleImage = true">Message-Slot</ArButton>
    <ArButton block type="outline" @click="visibleInput = true">getValue</ArButton>
  </div>

  <ArDialog
    v-model="visibleImage"
    title="换开发票须知说明"
    type="alert"
    confirm-text="知道了"
    @confirm="visibleImage = false"
  >
    <template #message>
      <div class="message">
        <p>
          1、每张发票仅支持一次换开发票操作，且需要在发票开具后90天内换开，超过时间不支持换开，请准确填写新换开发票的内容信息。
        </p>
        <p>2、换开发票时，系统会对第一张发票做红冲处理，红冲成功后第一张发票将失效。</p>
        <p>3、换开发票时，会以订单当前实付金额重新开具发票。</p>
      </div>
    </template>
  </ArDialog>

  <ArDialog
    v-model="visibleInput"
    title="提示"
    type="input"
    message="这是一个Dialog组件，使用了button插槽"
    button-layout="vertical"
    show-close
    @cancel="visibleInput = false"
    @confirm="visibleInput = false"
  >
    <template #button="{ getValue }">
      <ArButton type="outline" @click="console.log(getValue())">获取Input的值</ArButton>
      <ArButton type="outline" @click="console.log(getValue())">获取Input的值</ArButton>
      <ArButton type="outline" @click="console.log(getValue())">获取Input的值</ArButton>
    </template>
  </ArDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleImage = ref(false)
const visibleInput = ref(false)
</script>

<style scoped lang="less">
.message {
  p {
    text-align: left;
    margin-bottom: 15px;
    font-size: 24px;
  }
}
</style>
```

### 异步操作

组件的 onCancel 和 onConfirm 方法可接受异步函数，仅当异步返回值为 false 时不关闭弹窗

```vue
<template>
  <div class="dialog-row">
    <ArButton block type="outline" @click="alert">show-close</ArButton>
    <ArButton block type="outline" @click="image">show-bottom-close</ArButton>
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/index'
const dialog = useDialog()

const alert = () => {
  dialog.alert({
    message: '这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示',
    showClose: true
  })
}

const image = () => {
  dialog.image({
    message: '这是一个Dialog组件捏这是一个Dialog组件捏',
    title: '提示',
    imageSrc: 'https://img.leoao.com/测试/10b93f830de3f1b71280242f307ab376.jpg',
    imageAlign: 'top',
    showBottomClose: true
  })
}
</script>
```

## API

### ArDialog Props

| 名称                | 类型                                                     | 默认值       | 说明                             | 必传 |
| ------------------- | -------------------------------------------------------- | ------------ | -------------------------------- | ---- |
| type                | `alert ` &#124; `confirm` &#124; `input` &#124; ` image` | `confirm`    | 对话框类型                       | N    |
| visible             | boolean                                                  | `false`      | 是否显示，支持 v-model           | N    |
| title               | string                                                   | -            | 标题                             | N    |
| message             | `string ` &#124; ` string[]`                             | -            | 文本内容                         | N    |
| cancelText          | string                                                   | `取消`       | 取消按钮文字                     | N    |
| confirmText         | string                                                   | `确认`       | 确认按钮文字                     | N    |
| closeOnOverlayClick | boolean                                                  | `false`      | 是否点击遮罩层关闭对话框         | N    |
| buttonLayout        | `horizontal ` &#124; ` vertical`                         | `horizontal` | 底部按钮排列方式                 | N    |
| cancelButtonProps   | `Partial<ButtonProps>`                                   | -            | 透传的取消按钮 props             | N    |
| confirmButtonProps  | `Partial<ButtonProps>`                                   | -            | 透传的确认按钮 props             | N    |
| showCancelButton    | boolean                                                  | `true`       | 是否显示取消按钮                 | N    |
| showConfirmButton   | boolean                                                  | `true`       | 是否显示确认按钮                 | N    |
| showClose           | boolean                                                  | `false`      | 是否显示关闭按钮                 | N    |
| showBottomClose     | boolean                                                  | `false`      | 是否显示底部关闭按钮             | N    |
| imageSrc            | string                                                   | -            | type 为 image 时，图片地址       | N    |
| imageAlign          | `top ` &#124; ` center`                                  | `center`     | type 为 image 时，图片显示的位置 | N    |
| overlayProps        | `Partial<Omit<OverlayProps, visible>>`                   | -            | 透传至遮罩层的 props             | N    |

### ArDialog Events

| 名称         | 参数             | 描述               |
| ------------ | ---------------- | ------------------ |
| cancel       | `(val?: string)` | 点击取消时触发     |
| confirm      | `(val?: string)` | 点击确认时触发     |
| input-change | `(val: string)`  | input 框输入时触发 |

### ArDialog Slots

| 名称    | 描述     |
| ------- | -------- |
| message | 内容插槽 |
| button  | 按钮插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                              | 默认值         | 描述                       |
| --------------------------------- | -------------- | -------------------------- |
| --le-dialog-width                 | 550px          | 弹窗宽度                   |
| --le-dialog-padding               | 48px 32px 40px | 内边距                     |
| --le-dialog-bg-color              | #fff           | 背景颜色                   |
| --le-dialog-title-margin-bottom   | 24px           | 标题的下边距               |
| --le-dialog-message-max-height    | 546px          | 文案区最高高度             |
| --le-dialog-input-margin-top      | 32px           | 输入框的上边距             |
| --le-dialog-action-margin-top     | 32px           | 按钮的上边距               |
| --le-dialog-action-horizontal-gap | 16px           | 水平布局按钮的间距         |
| --le-dialog-action-vertical-gap   | 24px           | 垂直布局按钮的间距         |
| --le-dialog-close-icon-size       | 36px           | 关闭按钮的大小             |
| --le-dialog-close-icon-gap        | 24px           | 关闭按钮离顶部和右侧的间距 |
| --le-dailog-bottom-close-gap      | 40px           | 底部关闭按钮到内容区的距离 |
| --le-dailog-bottom-close-color    | #fff           | 底部关闭按钮颜色           |
| --le-dailog-bottom-close-size     | 84px           | 底部关闭按钮尺寸           |

<!-- RAG SPLIT -->

# ArPopover 弹出气泡

## 描述信息（When to use）

用于文字提示的气泡框

## 使用示例（Examples）

### 弹出方向

title 设置标题；content 设置内容；
placement 控制多个弹出方向：top、right、bottom、left、top-left、top-right、bottom-left、bottom-right

```vue
<template>
  <div class="popover-row">
    <ArPopover title="最宽展示范围" content="最宽展示范围" placement="top-left">
      <ArButton>Top-Left</ArButton>
    </ArPopover>
    <ArPopover title="最宽展示范围" content="最宽展示范围最宽展示范围" placement="top">
      <ArButton>Top</ArButton>
    </ArPopover>
    <ArPopover title="最宽展示范围" content="最宽展示范围最宽展示范围最宽展示范围" placement="top-right">
      <ArButton>Top-Right</ArButton>
    </ArPopover>
  </div>

  <div class="popover-row left">
    <ArPopover title="最宽展示范围" content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围" placement="right">
      <ArButton>Right</ArButton>
    </ArPopover>
  </div>
  <div class="popover-row right">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="left"
    >
      <ArButton>Left</ArButton>
    </ArPopover>
  </div>

  <div class="popover-row">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="bottom-left"
    >
      <ArButton>Btm-Left</ArButton>
    </ArPopover>
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="bottom"
    >
      <ArButton>Btm</ArButton>
    </ArPopover>
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="bottom-right"
    >
      <ArButton>Btm-Right</ArButton>
    </ArPopover>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.popover-row {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  &.left {
    justify-content: flex-start;
  }

  &.right {
    justify-content: flex-end;
  }
}
</style>
```

### triggerRef 指定触发元素

popover 将会定位至 body 上，不受父容器影响

```vue
<template>
  <div class="popover-row left">
    <ArSpace gap="0.24rem">
      <div v-for="(item, index) in list" :key="item" ref="triggerRef">
        <ArButton>Trigger</ArButton>
        <ArPopover
          placement="bottom"
          :trigger-ref="triggerRef[index]"
          title="最宽展示范围"
          content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
        >
        </ArPopover>
      </div>
    </ArSpace>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'

const list = reactive<number[]>([])
onMounted(() => {
  list.splice(0, list.length, 1, 2, 3, 4, 5, 6)
})

const triggerRef = ref([])
</script>

<style lang="less" scoped>
.popover-row {
  display: flex;
  padding: 24px;
  overflow-x: auto;

  &.left {
    justify-content: flex-start;
  }

  &.right {
    justify-content: flex-end;
  }
}
</style>
```

### 更多用法

showClose 设置是否显示关闭按钮；showArrow 设置是否显示箭头

```vue
<template>
  <div class="popover-row left">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="top-left"
      show-close
    >
      <ArButton>Show-Close</ArButton>
    </ArPopover>
  </div>
  <div class="popover-row left">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="top-left"
      :style="{ width: '6rem' }"
    >
      <ArButton>Bottom-ArButton</ArButton>
      <template #bottom="{ close }">
        <div class="bottom-button">
          <ArButton size="mini" @click="close">去看看</ArButton>
        </div>
      </template>
    </ArPopover>
  </div>

  <div class="popover-row left">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="top-left"
      :show-arrow="false"
    >
      <ArButton>Don't Show Arrow</ArButton>
    </ArPopover>
  </div>

  <div class="popover-row left">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="top-left"
      :show-popover="false"
    >
      <ArButton>Don't Show Popover</ArButton>
    </ArPopover>
  </div>

  <div class="popover-row left">
    <ArPopover
      title="最宽展示范围"
      content="最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围最宽展示范围"
      placement="right"
    >
      <ArButton>ArPopover Slot</ArButton>
      <template #popover="{ close }">
        <div style="color: #fff">
          <h2>亲亲😙~</h2>
          <h2>这里有温柔的客服姐姐哦~</h2>
          <div class="bottom-button" style="margin-top: 0.16rem">
            <ArButton size="mini" @click="closeHandler(close)">🖱立即畅聊</ArButton>
          </div>
        </div>
      </template>
    </ArPopover>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/index'
const toast = useToast()
const closeHandler = (close: Function) => {
  toast('hiahia~我来啦！')
  close()
}
</script>

<style lang="less" scoped>
.popover-row {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 24px;

  &.left {
    justify-content: flex-start;
  }

  &.right {
    justify-content: flex-end;
  }
}
</style>
```

## API

### ArPopover Props

| 名称                | 类型                                                                                                                                 | 默认值  | 说明                                           | 必传 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------- | ---- |
| triggerRef          | `HTMLElement`                                                                                                                        | -       | 触发元素，此优先级大于插槽                     | N    |
| showArPopover       | boolean                                                                                                                              | `true`  | 是否显示气泡                                   | N    |
| title               | string                                                                                                                               | -       | 气泡内标题                                     | N    |
| content             | string                                                                                                                               | -       | 内容                                           | N    |
| showClose           | boolean                                                                                                                              | `false` | 显示关闭按钮                                   | N    |
| showArrow           | boolean                                                                                                                              | `true`  | 显示箭头                                       | N    |
| placement           | `top ` &#124; `right` &#124; `bottom` &#124; `left` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; ` bottom-right` | `top`   | 弹出位置                                       | N    |
| closeOnClickOutside | boolean                                                                                                                              | `true`  | 点击外层关闭气泡                               | N    |
| reactive            | boolean                                                                                                                              | `true`  | 响应式根据指定元素的尺寸和位置信息更新气泡位置 | N    |
| style               | `object`                                                                                                                             | `{}`    | style 样式传递                                 | N    |

### ArPopover Events

| 名称  | 参数         | 描述       |
| ----- | ------------ | ---------- |
| close | `() => void` | 关闭时触发 |

### ArPopover Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 触发组件插槽 |
| popover | 内容插槽     |
| bottom  | 底部内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                      | 默认值        | 描述                     |
| ------------------------- | ------------- | ------------------------ |
| --le-popover-max-width    | 500px         | 最大宽度                 |
| --le-popover-bg-color     | rgba(0, 0, 0) | 背景颜色                 |
| --le-popover-title-color  | #fff          | 标题字色                 |
| --le-popover-color        | #fff          | 内容字色                 |
| --le-popover-bg-opacity   | 0.7           | 背景透明度               |
| --le-popover-arrow-width  | 22px          | 箭头的长度               |
| --le-popover-arrow-height | 14px          | 箭头的高度               |
| --le-popover-body-padding | 24px          | 浮窗的内边距             |
| --le-popover-gap          | 10px          | popover 与触发元素的间距 |
| --le-popover-arrow-gap    | 18px          | 箭头离最近一条边的边距   |
| --le-popover-duration     | 300ms         | 动画时间                 |
| --le-popover-zIndex       | 800           | 层级                     |

<!-- RAG SPLIT -->

# ArTour 引导

## 描述信息（When to use）

用于引导用户了解产品功能的气泡组件

## 使用示例（Examples）

### 模板使用

visible（支持 v-model） 控制组件显示；
steps 指定指引顺序；
offset 指定镂空遮罩相对于目标元素的偏移量；
popoverProps 设置通用 Popover 透传属性

```vue
<template>
  <div class="tour-wrap">
    <ArButton type="outline" size="mini" @click="running = true">START TOUR</ArButton>
  </div>

  <div class="tour-wrap">
    <ArGrid column="3" gap="0.2rem">
      <ArGridItem v-for="(_, index) in new Array(9)" :key="index">
        <ArButton :id="`btn${index + 1}`" block>{{ index + 1 }}</ArButton>
      </ArGridItem>
    </ArGrid>
    <ArTour
      v-model="running"
      :steps="['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8', 'btn9']"
      :popover-props="{
        title: '通用标题',
        content: '固定显示文本固定显示文本固定显示文本'
      }"
      :offset="[4, 4]"
    ></ArTour>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArTour from '../index'

const running = ref(false)
</script>

<style lang="less" scoped>
.tour-wrap {
  padding: 0 20px 20px 20px;
}
</style>
```

### 函数式使用

使用 useTour 创建 tour 实例，使用 tour.start() 方法开启引导

```vue
<template>
  <div class="tour-wrap">
    <ArButton type="outline" size="mini" @click="tour.start">START TOUR</ArButton>
  </div>
  <div class="tour-wrap">
    <ArGrid column="3" gap="0.2rem">
      <ArGridItem v-for="(_, index) in new Array(9)" :key="index">
        <ArButton :id="`btn#${index + 1}`" block>{{ index + 1 }}</ArButton>
      </ArGridItem>
    </ArGrid>
  </div>
</template>

<script setup lang="ts">
import { useTour } from '@/index'

const steps = new Array(9).fill(1).map((_, index) => ({
  id: `btn#${index + 1}`,
  popoverProps: {
    title: `Step ${index + 1}`,
    content: `第 ${index + 1} 步骤的提示内容！再加一部分多余内容好吧。`,
    placement: 'top'
  }
}))

const tour = useTour({
  steps: steps
})
</script>

<style lang="less" scoped>
.tour-wrap {
  padding: 0 20px 20px 20px;
}
</style>
```

## API

### ArTour Props

| 名称         | 类型                                | 默认值   | 说明                                                                                                 | 必传 |
| ------------ | ----------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- | ---- |
| visible      | boolean                             | `false`  | 是否显示，支持 v-model                                                                               | N    |
| steps        | `string[] ` &#124; ` TArTourItem[]` | `[]`     | 触发列表。 [详细类型定义](http://gitlab.leoao-inc.com/cnpm/aries-ui/-/blob/master/src/tour/types.ts) | N    |
| offset       | `number[]`                          | `[4, 4]` | 镂空遮罩相对于目标元素的偏移量                                                                       | N    |
| popoverProps | `Partial<PopoverProps>`             | `[]`     | 透传至 popover                                                                                       | N    |

### ArTour Events

| 名称   | 参数                                                    | 描述       |
| ------ | ------------------------------------------------------- | ---------- |
| change | `({current:number, steps:ArTourProps['steps']}) => any` | 变化时触发 |
| finish |                                                         | 结束时触发 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称               | 默认值 | 描述           |
| ------------------ | ------ | -------------- |
| --le-tour-zIndex   | 1000   | 层级           |
| --le-tour-duration | 300ms  | 引导的动画时长 |

<!-- RAG SPLIT -->

# ArPullDownRefresh 下拉刷新

## 描述信息（When to use）

用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新

## 使用示例（Examples）

### 基本使用

```vue
<template>
  <ArPullDownRefresh v-model="loading" :show-loading-icon="showLoadingIcon" @refresh="getMore">
    <div class="pulldown-wrap">
      <div v-for="item in new Array(10)" :key="item" class="box"></div>
    </div>
  </ArPullDownRefresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const getMore = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

defineProps<{ showLoadingIcon: boolean }>()
</script>

<style lang="less" scoped>
.pulldown-wrap {
  min-height: 70vh;
  padding: 24px;
  background-color: #fff;
}
.box {
  min-height: 300px;
  background-color: orange;
  border-radius: 24px;
  margin-bottom: 24px;
}
</style>
```

## API

### PullDownRefresh Props

| 名称            | 类型       | 默认值                                              | 说明                       | 必传 |
| --------------- | ---------- | --------------------------------------------------- | -------------------------- | ---- |
| loading         | boolean    | `false`                                             | 控制加载状态, 支持 v-model | N    |
| showLoadingIcon | boolean    | `true`                                              | 展示加载图标               | N    |
| refreshTimeout  | number     | `10000`                                             | 超时时间                   | N    |
| loadingTexts    | `string[]` | `['下拉刷新', '松手刷新', '刷新中...', '刷新完成']` | 提示语                     | N    |
| disabled        | boolean    | `false`                                             | 禁用                       | N    |

### PullDownRefresh Events

| 名称    | 参数 | 描述       |
| ------- | ---- | ---------- |
| refresh |      | 刷新时触发 |
| timeout |      | 超时时触发 |

### PullDownRefresh Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                    | 默认值      | 描述             |
| --------------------------------------- | ----------- | ---------------- |
| --le-pulldownrefresh-bg-color           | transparent | 下拉刷新背景颜色 |
| --le-pulldownrefresh-loading-text-color | #ABA7B6     | 提示语颜色       |

<!-- RAG SPLIT -->

# ArDropdownMenu 下拉菜单

## 描述信息（When to use）

菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成

## 使用示例（Examples）

### 基础使用

```vue
<template>
  <div class="drop-menu">
    <div ref="triggerRef" class="tabbar">
      <div v-for="(_, index) in new Array(4)" :key="index" class="tabItem" @click="itemChanger(index)">
        <span>筛选分类</span>
        <SortBaseIcon
          size="0.16rem"
          :color="current === index && visible ? 'var(--le-theme-color)' : '#2a2a2d'"
          :class="{ 'item-icon': true, 'rotate-icon': current === index && visible }"
        />
      </div>
    </div>
    <ArDropdownMenu v-model="visible" :trigger="triggerRef">
      <div class="content">
        <div class="scroll">
          <div v-show="current === 0">
            <ArRadioGroup :options="options" @change="change"> </ArRadioGroup>
          </div>
          <div v-show="current === 1">
            <ArTagOption
              title="默认单项：人物画像"
              :value="tagCurrent"
              :options="tagOptions"
              column="3"
              @change="(val) => (tagCurrent = val)"
            ></ArTagOption>
          </div>
          <div v-show="current === 2">
            <ArEmpty
              image="https://img.leoao.com/workOrder/1686055598038_pfysk35kzjl.png"
              class="empty"
              description="暂无数据"
            >
            </ArEmpty>
          </div>
          <div v-show="current === 3">
            <ArSteps :current="1" layout="vertical">
              <ArStepItem title="选择意向" :content="['退款申请已提交', '2021/12/20 12:00']"></ArStepItem>
              <ArStepItem title="教练接单" :content="['对方领取成功', '2021/12/20 12:30']"></ArStepItem>
              <ArStepItem title="完成约课" content="转课成功"></ArStepItem>
            </ArSteps>
          </div>
        </div>
        <div class="btn">
          <ArButton type="outline" @click="closeMenu">取消</ArButton>
          <ArButton @click="closeMenu">确认</ArButton>
        </div>
      </div>
    </ArDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { SortBaseIcon } from '@lefit/aries-ui-icon'
import { reactive, ref } from 'vue'
const current = ref()

const visible = ref(false)
const triggerRef = ref<Element>()

const itemChanger = (index: number) => {
  if (current.value === index && visible.value) {
    closeMenu()
  } else {
    current.value = index
    visible.value = true
  }
}

const closeMenu = () => {
  visible.value = false
}

const options = reactive<any[]>([
  { label: '使用 RadioGroup 包裹一组单选', value: '1', placement: 'left' },
  {
    label: '通过 options 属性传入列表',
    value: '2',
    description: '描述文案描述文案描述文案描述文案。',
    placement: 'left'
  },
  { label: '标题文案', value: '3', description: '描述文案描述文案描述文案描述文案。', placement: 'left' },
  {
    label: '禁用文案',
    value: '4',
    description: '描述文案描述文案描述文案描述文案。',
    placement: 'left',
    disabled: true
  }
])
const change = (val: string) => console.log('change', val)
const tagCurrent = ref([])
const infos = [
  '篮球',
  '唱',
  '跳',
  'Rap',
  '鸡你太美',
  '中分',
  '背带裤',
  '一位故人',
  '实习生',
  '练习两年半',
  '坤坤',
  '你干嘛，哎呦哎呦哎呦哎呦~'
]
const tagOptions = reactive(infos.map((item, index) => ({ label: item, value: index })))
</script>

<style lang="less" scoped>
.drop-menu {
  background-color: #efefef;
  height: 30vh;
}

.tabbar {
  display: flex;
  height: 110px;
  align-items: center;
  background-color: #fff;
  font-size: 26px;

  .tabItem {
    flex: 1;
    text-align: center;
  }

  .item-icon {
    margin-left: 4px;
    transform: rotate(180deg);
    transition: all 0.3s;
  }

  .rotate-icon {
    transform: rotate(0deg);
  }
}

.content {
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.scroll {
  width: 100%;
  overflow-y: scroll;
  flex: 1;
  margin-bottom: 24px;
}

.btn {
  width: 100%;
  display: flex;
  & > button:not(:last-child) {
    margin-right: 16px;
  }

  & > button {
    flex: 1;
  }
}
</style>
```

### 支持点击遮罩或外层关闭

通过 change 事件处理 close-on-click-outside 及 close-on-overlay-click 的副作用

```vue
<template>
  <div class="drop-menu">
    <div ref="triggerRef" class="tabbar">
      <div v-for="(_, index) in new Array(4)" :key="index" class="tabItem" @click="itemChanger(index)">
        <span>筛选分类</span>
        <SortBaseIcon
          size="0.16rem"
          :color="current === index && visible ? 'var(--le-theme-color)' : '#2a2a2d'"
          :class="{ 'item-icon': true, 'rotate-icon': current === index && visible }"
        />
      </div>
    </div>
    <ArDropdownMenu v-model="visible" :trigger="triggerRef" close-on-overlay-click>
      <div class="content">
        <div class="scroll">
          <div v-for="(_, index) in new Array(10)" :key="index">Text {{ current }}</div>
        </div>
        <div class="btn">
          <ArButton type="outline" @click="closeMenu">取消</ArButton>
          <ArButton @click="closeMenu">确认</ArButton>
        </div>
      </div>
    </ArDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { SortBaseIcon } from '@lefit/aries-ui-icon'
import { ref } from 'vue'
const current = ref()

const visible = ref(false)
const triggerRef = ref<Element>()

const itemChanger = (index: number) => {
  if (current.value === index && visible.value) {
    closeMenu()
  } else {
    current.value = index
    visible.value = true
  }
}

const closeMenu = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.drop-menu {
  background-color: #efefef;
  height: 40vh;
}

.tabbar {
  display: flex;
  height: 110px;
  align-items: center;
  background-color: #fff;
  font-size: 26px;

  .tabItem {
    flex: 1;
    text-align: center;
  }

  .item-icon {
    margin-left: 4px;
    transform: rotate(180deg);
    transition: all 0.3s;
  }

  .rotate-icon {
    transform: rotate(0deg);
  }
}

.content {
  height: 24vh;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.scroll {
  margin-bottom: 24px;
  width: 100%;
  overflow-y: scroll;
  flex: 1;
}

.btn {
  width: 100%;
  display: flex;
  & > button:not(:last-child) {
    margin-right: 16px;
  }

  & > button {
    flex: 1;
  }
}
</style>
```

## API

### DropdownMenu Props

| 名称                | 类型                                             | 默认值  | 说明                   | 必传 |
| ------------------- | ------------------------------------------------ | ------- | ---------------------- | ---- |
| visible             | boolean                                          | `false` | 是否显示，支持 v-model | N    |
| trigger             | `Element`                                        | -       | 触发 DOM               | N    |
| closeOnOverlayClick | boolean                                          | `false` | 点击蒙层关闭弹窗       | N    |
| popupProps          | `Partial<Omit<PopupProps, closeOnOverlayClick>>` | -       | 透传至 popup 的属性    | N    |

### DropdownMenu Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| close | `(e: MouseEvent)` | 关闭时触发 |

### DropdownMenu Slots

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认内容插槽 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |

<!-- RAG SPLIT -->

# useScrollElementAnchors

## 描述信息（When to use）

用于实现滚动元素锚点功能的 hooks，既可以监听锚点元素滚动到触发区域，也提供 scrollToTargetByKey 返回函数将锚点元素滚动到指定区域

## 使用示例（Examples）

### 基础用法

在明确锚点元素数量&能直接挂载 ref 时使用

```vue
<template>
  <div class="tdesign-mobile-demo">
    <ArSticky :z-index="1000">
      <ArTabs v-model="current" space-equal :style="{ fontSize: '24px', height: '1rem' }" @click="tabClickHandler">
        <ArTabPanel label="Tab-1" :value="0"></ArTabPanel>
        <ArTabPanel label="Tab-2" :value="1"></ArTabPanel>
        <ArTabPanel label="Tab-3" :value="2"></ArTabPanel>
        <ArTabPanel label="Tab-4" :value="3"></ArTabPanel>
      </ArTabs>
    </ArSticky>

    <div ref="first" class="archor">
      <p>First</p>
    </div>
    <div ref="second" class="archor">
      <p>Second</p>
    </div>
    <div ref="third" class="archor">
      <p>Third</p>
    </div>
    <div ref="fourth" class="archor">
      <p>Fourth</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useScrollElementAnchors } from '@lefit/aries-ui'

const first = ref()
const second = ref()
const third = ref()
const fourth = ref()

const scrollHandler = (key: number) => {
  current.value = key
}

// rem转px
const rem2px = (rem: number) => {
  return ((document.documentElement.clientWidth * 100) / 750) * rem
}

const { scrollToTargetByKey } = useScrollElementAnchors(
  // 可显示设置key
  // [
  //   {
  //     key: 0,
  //     element: first
  //   },
  //   {
  //     key: 1,
  //     element: second
  //   },
  //   {
  //     key: 2,
  //     element: third
  //   },
  //   {
  //     key: 3,
  //     element: fourth
  //   }
  // ],
  // 不设置key，则默认为索引
  [first, second, third, fourth],
  scrollHandler,
  // 第三参数为锚点触发距离，指离视窗顶部的距离，此处为50px的吸顶Tabs高度 + 12px锚点元素距离Tabs的距离，可根据需求调大或调小
  rem2px(1.24)
)

const current = ref(0)

const tabClickHandler = (val: number) => {
  scrollToTargetByKey(val)
}
</script>

<style scoped>
.archor {
  height: 80vh;
  margin: 24px;
  background-color: #ccc;
  border-radius: 24px;

  font-size: 60px;
  line-height: 1.5;
  font-weight: 600;
  padding: 0 24px;
}
</style>
```

### 不确定锚点数量

在不确定有多少个锚点元素时使用

```vue
<template>
  <div class="tdesign-mobile-demo">
    <ArSticky>
      <ArTabs v-model="current" :style="{ fontSize: '24px', height: '1rem' }" @click="tabClickHandler">
        <ArTabPanel v-for="(item, index) in tabslist" :key="index" :label="`RTab-${index}`" :value="index"></ArTabPanel>
      </ArTabs>
    </ArSticky>

    <div v-for="(item, index) in tabslist" ref="container" :key="index" class="archor">
      <p>Page-{{ index }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useScrollElementAnchors, useLoading } from '@lefit/aries-ui'

const loading = useLoading()
const container = ref<HTMLElement[]>([])
const tabslist = reactive<number[]>([])

onMounted(() => {
  loading.show()
  setTimeout(() => {
    tabslist.splice(0, 0, ...new Array(Math.floor(Math.random() * 10) + 3).fill(0))
    loading.hide()
  }, 1200)
})

const scrollHandler = (key: number) => {
  current.value = key
}

// rem转px
const rem2px = (rem: number) => {
  return ((document.documentElement.clientWidth * 100) / 750) * rem
}

const { scrollToTargetByKey } = useScrollElementAnchors(
  container,
  scrollHandler,
  // 第三参数为锚点触发距离，指离视窗顶部的距离，此处为50px的吸顶Tabs高度 + 12px锚点元素距离Tabs的距离，可根据需求调大或调小
  rem2px(1.24) // 1.24rem = 50px + 12px
)

const current = ref(0)

const tabClickHandler = (val: string) => {
  scrollToTargetByKey(val)
}
</script>

<style scoped>
.archor {
  height: 80vh;
  margin: 24px;
  background-color: #ccc;
  border-radius: 24px;

  font-size: 60px;
  line-height: 1.5;
  font-weight: 600;
  padding: 0 24px;
}
</style>
```

### 局部动态锚点

锚点元素外层的滚动容器的外层也是滚动容器时使用

```vue
<template>
  <div class="tdesign-mobile-demo">
    <div class="other-content">other-content</div>
    <div ref="elementMain" class="element-main">
      <ArSticky :container="elementMain">
        <ArTabs v-model="current" :style="{ fontSize: '24px', height: '1rem' }" @click="tabClickHandler">
          <ArTabPanel
            v-for="(item, index) in tabslist"
            :key="index"
            :label="`RTab-${index}`"
            :value="index"
          ></ArTabPanel>
        </ArTabs>
      </ArSticky>

      <div v-for="(item, index) in tabslist" ref="container" :key="index" class="archor">
        <p>Page-{{ index }}</p>
      </div>
    </div>
    <div class="other-content">other-content</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useScrollElementAnchors, useLoading } from '@lefit/aries-ui'
import { onMounted, reactive } from 'vue'
import { nextTick } from 'vue'

const loading = useLoading()
const elementMain = ref()

const container = ref<HTMLElement[]>([])

const tabslist = reactive<number[]>([])

// rem转px
const rem2px = (rem: number) => {
  return ((document.documentElement.clientWidth * 100) / 750) * rem
}

onMounted(() => {
  const wrapContainer = document.querySelector('.tdesign-demo-main')!
  wrapContainer.onscroll = () => {
    const { top } = elementMain.value.getBoundingClientRect()
    // 监听滚动事件，动态修改distance的值
    setDistance(top + rem2px(1.24))
  }

  loading.show()
  setTimeout(() => {
    tabslist.splice(0, 0, ...new Array(Math.floor(Math.random() * 10) + 3).fill(0))
    loading.hide()
    // 非必要代码
    nextTick(() => {
      wrapContainer.scrollTo({
        top: 100,
        behavior: 'smooth'
      })
      setTimeout(() => scrollToTargetByKey(2), 300)
    })
  }, 1200)
})

const scrollHandler = (key: string | number) => {
  current.value = key as number
}

const { scrollToTargetByKey, setDistance } = useScrollElementAnchors(container, scrollHandler, rem2px(7.24))

const current = ref(0)

const tabClickHandler = (val: string) => {
  scrollToTargetByKey(val)
}
</script>

<style scoped>
.archor {
  height: 80vh;
  margin: 24px;
  background-color: #ccc;
  border-radius: 24px;

  font-size: 60px;
  line-height: 1.5;
  font-weight: 600;
  padding: 0 24px;
}

.tdesign-mobile-demo {
  padding-bottom: 0;
}

.other-content {
  height: 500px;
  background-color: #888;
  font-size: 60px;
  line-height: 1.5;
  font-weight: 600;
  padding: 0 24px;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.element-main {
  height: 80vh;
  overflow-y: auto;
  position: relative;
}
</style>
```

## API

### useScrollElementAnchors Props

| 名称     | 类型                                                                                                   | 默认值 | 说明                                            | 必传 |
| -------- | ------------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------------- | ---- |
| elements | `{  key: string, element: Ref<HTMLElement>}[]` &#124; `Ref<HTMLElement>[]` &#124; `Ref<HTMLElement[]>` | -      | 锚点元素列表                                    | Y    |
| callback | `(key: string \| number) => void`                                                                      | -      | 锚点元素滚动到触发区域的回调                    | Y    |
| distance | `number`                                                                                               | `60`   | 锚点元素的可触发区域距离屏幕顶部的距离，单位 px | N    |

### useScrollElementAnchors Returns

| 名称                | 类型                                               | 说明                                                                            |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| scrollToTargetByKey | `(key: string \| number, smooth: boolean) => void` | 通过 key 指定需要滚动至指定区域的锚点元素, smooth 控制是否平滑滚动, 默认为 true |
| setDistance         | `(val: number) => void`                            | 设置最新的 distance 参数                                                        |
