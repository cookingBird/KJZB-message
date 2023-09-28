<template>
<iframe
	ref="iframe"
	:data-app-code="microAppCode"
	:src="buildSrc(src)"
	:id="id"
	class="gislife-micro-app"
	title=""
>
</iframe>
</template>

<script setup lang="ts">
import {
	onMounted,
	onBeforeUnmount,
	computed,
	ref,
	nextTick,
	watch,
} from "vue";

import { connector } from './index';
import * as Qs from 'qs';
defineOptions({
	name: 'MicroApp',
})

const props = defineProps<{
	src: string,
	microAppCode: string,
	state?: Record<string, any>,
	query?: Record<string, any>,
}>()
const emits = defineEmits([]);

const id = computed(() => ('gislife-' + props.microAppCode));
const passiveState = computed(() => JSON.parse(JSON.stringify(props.state || {})));
const buildSrc = computed(() => (src: string) => {
	const query = Qs.stringify(props.query || {});
	if (src.indexOf('?') === -1) {
		return src + '?' + query + '&microAppCode=' + props.microAppCode;
	} else {
		return src + '&' + query + '&microAppCode=' + props.microAppCode;
	}
})

const iframe = ref<HTMLElement>(null);
onMounted(async () => {
	await nextTick();
	// 监听iframe加载完成
	iframe.value!.addEventListener('load', () => {
		emits('load', true);
		connector.$send({
			target: props.microAppCode,
			type: 'setState',
			data: passiveState.value
		});
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
