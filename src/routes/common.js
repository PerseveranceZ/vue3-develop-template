export default [{
    name: "index",
    path: "/",
    component: () => import('/src/views/index.vue')
    // children: [{
    //     name: "system1",
    //     path: "system1",
    //     kstype: 'system',
    //     component: resolve => require(['Views/system1/index'], resolve)
    // }, {
    //     name: "system2",
    //     path: "system2",
    //     kstype: 'system',
    //     component: resolve => require(['Views/system2/index'], resolve)
    // }, {
    //     name: "system3",
    //     path: "system3",
    //     kstype: 'system',
    //     component: resolve => require(['Views/system3/index'], resolve)
    // }]
}]