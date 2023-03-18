<template>
  <div id="app">
    <button @click="send">发送消息</button>
    <button @click="sendState">发送state</button>
    <button @click="sendReactive">发送sendReactive</button>
    <button @click="sendLoop">发送嵌套对象</button>
    <button @click="sendLoopReact">发送嵌套响应式对象</button>
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
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000)
      })
    },
    sendState () {
      const msg = {
        data: Math.random() * 1000
      }
      window.parent.postMessage(msg,'*')
    },
    sendReactive () {
      this.reactiveData = {
        ...this.reactiveData,
        number: Math.random() * 10000
      }
      window.parent.postMessage(this.reactiveData,'*')
    },
    sendLoop () {
      const data = {
        data: {
          data: {
            data: {
              number: Math.random() * 10000
            }
          }
        }
      }
      window.parent.postMessage(data,'*')
    },
    sendLoopReact () {
      this.reactiveData = {
        ...this.reactiveData,
        number: Math.random() * 10000
      }
      const data = {
        data: {
          data: {
            data: {
              number: this.reactiveData
            }
          }
        }
      }
      window.parent.postMessage(data,'*')
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
