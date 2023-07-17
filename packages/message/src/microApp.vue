<template>
<iframe
	:data-app-code="microAppCode"
	:src="buildSrc(src)"
	:id="id"
	class="gislife-micro-app"
	title=""
>
</iframe>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watchEffect, computed,watch } from "vue";
import { deepCloneBaseType } from './util';
import { connector } from './index';

const props = defineProps<{
	src:string,
	microAppCode:string,
	state?:unknown,
}>()
const emit = defineEmits();
console.log("props",props);
const id = computed(() => ('gislife-' + props.microAppCode));
const passiveState = computed(() => (deepCloneBaseType(props.state)));
const buildSrc = computed(() => (src:string) => (src + (src.includes('?') ? '&' : '?') + 'microAppCode=' + props.microAppCode))

watch(passiveState,(val)=>{
	console.log("watch passiveState",val);
})
watchEffect(() => {
	const state = passiveState.value;
	connector.$send({
		target: props.microAppCode,
		type: 'setState',
		data: state
	});
	console.log("watchEffect state",state,props);
})

let cancel:Function;
onMounted(() => {
	cancel = connector.$on(({ msg }) => {
		emit(msg.type, msg.data)
	})
})

onBeforeUnmount(() => {
	cancel?.();
	connector.unRegisterApp(props.microAppCode);
})

</script>

<style lang="css">
	.gislife-micro-app {
		width: 100%;
		height: 100%;
	}
</style>
