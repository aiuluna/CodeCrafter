import { createApp } from "vue"
// 先导入Element Plus的样式
// import "element-plus/dist/index.css"
// import "element-plus/theme-chalk/src/message.scss"
// 再导入Element Plus组件
import Aries, { useTheme } from "@lefit/aries-ui"
// import { AngleDownIcon } from "@lefit/aries-ui-icon"

import * as AriesIcons from "@lefit/aries-ui-icon"

import App from "./App.vue"

// import "~/styles/element/index.scss";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss"
import "uno.css"

// 创建应用实例
const app = createApp(App)
// 使用Aries UI
app.use(Aries)
useTheme("Merchant")

// 注册所有图标
for (const [key, component] of Object.entries(AriesIcons)) {
  app.component(key, component)
}

// 挂载应用
app.mount("#app")
