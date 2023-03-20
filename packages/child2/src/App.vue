<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="This is child2" />
    <microApp
      :src="appConfig.url"
      frameborder="0"
      class="container-item"
      :microAppCode="appConfig.microAppCode"
    >
    </microApp>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    const IP = 'http://localhost';
    return {
      appConfig: {
        url: IP + ':7004/?microAppCode=grand2',
        microAppCode: 'grand2'
      }
    }
  },
  created () {
    this.$connector.$on(this,"message",(res) => {
      console.log('on message child2---------------',res)
      this.msg = res;
    })
  }
}
</script>

<style>
html,
body {
  height: 100vh;
  margin: 0;
}

iframe {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
