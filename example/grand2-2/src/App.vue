<template>
<div id="app">
  <HelloWorld msg="This is grand2-2" />
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div>
  </div>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { connector } from '@gislife/micro-message'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: '',
      global: ''
    }
  },
  //grand2
  created() {
    connector.$on('greet', (res) => {
      const { data, msg, responser } = res
      console.log('msg', msg);
      responser("hello, i am grand2-2")
    })
  },
}
</script>

<style>
body {
  height: 100vh;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
