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
import {
	onMounted,
	onBeforeUnmount,
	watchEffect,
	computed,
	defineProps,
	defineEmits,
	defineOptions
} from "vue";
import { deepCloneBaseType } from './util';
import { connector } from './index';
import * as Qs from 'qs';
defineOptions({
	name: 'MicroApp',
})

const props = defineProps<{
	src: string,
	microAppCode: string,
	state?: Record<string, unknown>,
	query?: Record<string, unknown>,
}>()
const emit = defineEmits();

const id = computed(() => ('gislife-' + props.microAppCode));
const passiveState = computed(() => (deepCloneBaseType(props.state)));
const buildSrc = computed(() => (src: string) => {
	const query = Qs.stringify(props.query);
	if (src.indexOf('?') === -1) {
		return src + '?' + query + '&microAppCode=' + props.microAppCode;
	} else {
		return src + '&' + query + '&microAppCode=' + props.microAppCode;
	}
})


watchEffect(() => {
	const state = passiveState.value;
	connector.$send({
		target: props.microAppCode,
		type: 'setState',
		data: state
	});
})

let cancel: Function;
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
