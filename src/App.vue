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
      // 直接使用 inject $api $const 拿到方法和变量
      const { otherUserInfo } = inject('$api');
      console.log(inject('$const'))
      const { OTHER_MENU } = inject('$const');

      otherUserInfo({
          a: 123
      })

      console.log(OTHER_MENU);
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