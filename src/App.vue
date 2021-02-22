<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
      HelloWorld
  },
  created() {
      // 直接使用inject $api 请求
      inject('$api')['user/info']({
          a: 123
      })
      // 注入变量
      console.log(inject('$const')['OTHER/MENU']);
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>