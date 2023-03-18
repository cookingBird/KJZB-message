<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="This is child1" />
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
    const IP = 'http://192.168.0.109';
    return {
      appConfig: {
        url: IP + ':7003/?microAppCode=grand1',
        microAppCode: 'grand1'
      }
    }
  },
  mounted () {
    this.$connector.onState(this,
      res => {
        console.error('on state response------------------',res)
      })
    window.addEventListener('message',res => {
      console.log('child1----------------',res.data);
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
