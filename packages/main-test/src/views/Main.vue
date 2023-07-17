<template>
<div id="app">
  <HelloWorld msg="This is main " />
  <div>global:{{global}}</div>
  <a-space>
    <a-button
      type="primary"
      @click="show = !show"
    >关闭</a-button>
    <a-button @click="changeState">改变state</a-button>
    <a-button @click="globalSend">全局发送</a-button>
  </a-space>
  <div class="container">
    <micro-app
      v-if="show"
      :src="child1Config.url"
      frameborder="0"
      class="container-item"
      :microAppCode="child1Config.microAppCode"
      :state="child1Config.state"
    >
    </micro-app>
    <micro-app
      :src="child2Config.url"
      frameborder="0"
      class="container-item"
      :microAppCode="child2Config.microAppCode"
      :state="child2Config.state"
    >
    </micro-app>

  </div>
</div>
</template>

<script >
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    const IP = 'http://localhost';

    return {
      child1Config: {
        url: `${IP}:7001`,
        microAppCode: 'child1',
        state: {
          name: 'state',
        },
      },
      child2Config: {
        url: `${IP}:7002/?microAppCode=child2`,
        microAppCode: 'child2',
      },
      show: true,
      global: '',
    };
  },
  mounted() {
    console.log('main---------------ROUTER', this.$route);
    console.log('main---------------ROUTER exclude', this.excludeFunc(this.$route, (n, key) => typeof n !== 'function' && key !== 'matched'));

    this.$connector.$on('responser', ({ data, responser }) => {
      console.log('on responser-----------------', data, responser);
      responser({
        msg: 'congratulation responser test !!!!!!!',
      });
    });
    this.$connector.$on('config', ({ data, responser }) => {
      console.log('on config-----------------', data, responser);
      responser({
        msg: 'congratulation config success !!!!!!!',
      });
    });
    this.$connector.$on(({ data }) => {
      if (data.type === 'message') {
        this.global = data.data;
        console.warn('callback global send success-----------------', data, this.$connector.getMicroAppCode());
      }
    });
  },
  methods: {
    changeState() {
      this.child1Config.state = { ...this.child1Config.state, value: Math.floor(Math.random() * 1021000) };
    },
    changeState2() {
      this.child2Config.state = { ...this.child2Config.state, value: Math.floor(Math.random() * 1021000) };
    },
    globalSend() {
      this.$connector.$send({
        target: 'global',
        type: 'message',
        data: Math.floor(Math.random() * 100000),
      });
    },
    excludeFunc(obj, judgeCb) {
      const res = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (judgeCb?.(value, key)) {
          res[key] = value;
        }
      });
      return res;
    },
    onEdit(data) {
      console.warn('this is root, i received--------------', data);
    },
  },
};
</script>

<style>
  .container {
    display: flex;
    height: 100%;
  }

  .container-item {
    flex-grow: 1;
  }

  html,
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
    height: 100%;
  }
</style>
