<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <button @click="getConfig">获取全局配置</button>
    <button @click="responserTest">Responser Test</button>
    <button @click="configTest">Config Test</button>
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
  //grand2
  created () {
    this.$connector.$on(this,'callback',(res) => {
      console.warn('success------callback--------',res)
    })
    this.$connector.$on(this,"message",({ data }) => {
      console.log('on message grand2---------------',data)
      this.msg = data;
    })
  },
  methods: {
    getConfig () {
      this.$connector.getConfig().then(res => {
        console.log('get config success--------------',res)
      })
    },
    responserTest () {
      this.$connector.$send({
        target: 'main',
        type: 'responser',
        timeout: 3000
      }).then(res => {
        console.error('test responser success--------------',res)
      })
    },
    configTest () {
      this.$connector.$send({
        target: 'main',
        type: 'configTest',
        timeout: 3000
      }).then(res => {
        console.error('test configTest success--------------',res)
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
