<template>
  <div id="app">
    <button @click="send">发送消息</button>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="This is grand1" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    setTimeout(() => {
      this.$connector.$send({
        target: 'grand2',
        type: 'callback',
        data: {
          msg: 'i am callback'
        }
      })
    },1000);
  },
  methods: {
    send () {
      this.$connector.$send({
        target: 'grand2',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    }
  }
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
