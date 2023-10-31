<template>
<iframe
  ref="container"
  :data-app-code="microAppCode"
  :src="buildSrc(src)"
  :id="id"
  class="gislife-micro-app"
  title=""
>
</iframe>
</template>

<script setup>
import {
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  watch,
} from "vue";
import { ensureInstance } from "../src/util";
import { connector } from '../src/index';
import { stringify } from 'qs';
defineOptions({
  name: 'MicroAppVue',
})

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  microAppCode: {
    type: String,
    required: true
  },
  state: Object,
  query: Object
})
const emits = defineEmits(['load']);

const id = computed(() => ('gislife-' + props.microAppCode));
const passiveState = computed(() => JSON.parse(JSON.stringify(props.state || {})));
function buildSrc(src) {
  const query = stringify(props.query || {});
  if (src.indexOf('?') === -1) {
    return src + '?' + query + '&microAppCode=' + props.microAppCode;
  } else {
    return src + '&' + query + '&microAppCode=' + props.microAppCode;
  }
}

const container = ref(null);
onMounted(() => {
  ensureInstance(() => container.value)
    .then((dom) => {
      dom.addEventListener('load', () => {
        emits('load', true);
        connector.$send({
          target: props.microAppCode,
          type: 'setState',
          data: passiveState.value
        });
      })
    })
});


onBeforeUnmount(watch(passiveState, (val) => {
  connector.$send({
    target: props.microAppCode,
    type: 'setState',
    data: val
  });
}))

onMounted(() => {
  const cancel = connector.$on(({ msg }) => {
    // @ts-expect-error
    emits(msg.type, msg.data)
  });
  onBeforeUnmount(cancel);
})

onBeforeUnmount(() => {
  connector.unRegisterApp(props.microAppCode);
})
</script>

<style lang="css">
  .gislife-micro-app {
    width: 100%;
    height: 100%;
  }
</style>
