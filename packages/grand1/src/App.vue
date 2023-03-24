<template>
  <div id="app">
    <button @click="send">全局发送</button>
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
  data () {
    return {
      reactiveData: {
        number: 100000
      }
    }
  },
  mounted () {
    this.$connector.$on(this,({ data }) => {
      if (data.type === 'message') {
        console.warn('callback global send success-----------------',data,this.$connector.getMicroAppCode());
      }
    })
  },
  methods: {
    send () {
      this.$connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
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
