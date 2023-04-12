import { createApp } from 'vue'
import App from './App.vue'
import "./main.css"


import mitt from 'mitt'

// 引入插件
import Router from '/src/plugins/router'
import Api from '/src/plugins/api'
import Const from '/src/plugins/const'
import Axios from '/src/plugins/axios'
import Store from "/src/plugins/store"

import Clickoutside from "/src/directives/clickoutside"

const app = createApp(App)
// 注册 window 全局方法
window.$bus = mitt();
window.$axios = Axios;

// 注册插件
app.use(Router)
app.use(Store);

// 注册 this
app.provide("$api", Api)
app.provide("$axios", Axios);
app.provide("$const", Const)
// 注册全局指令
app.directive("clickoutside", Clickoutside);

app.mount("#app")
