<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <div>{{msg}}</div>
    <HelloWorld msg="This is grand2" />
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
      msg: ''
    }
  },
  created () {
    this.$connector.$on(this,'callback',(res) => {
      console.warn('success------callback--------',res)
    })
    this.$connector.$on(this,"message",(res) => {
      console.log('on message grand2---------------',res)
      this.msg = res;
    })
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
