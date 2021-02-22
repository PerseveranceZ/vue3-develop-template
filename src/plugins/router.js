import { getModules } from "/src/utils/tools"
import { createRouter, createWebHistory } from "vue-router"
import { routerBeforeEachFunc } from "/src/config/int-router"

const routerHistory = createWebHistory()
// 同步加载路由配置
const modules = getModules(import.meta.globEager("../routes/**/*.js"))

// 注入默认配置和路由表
let routerInstance = new createRouter({
    history: routerHistory,
    routes: modules,
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)

export default routerInstance