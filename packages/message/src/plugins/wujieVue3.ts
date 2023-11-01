import { mergeOps } from "../util";
const WuJiePackage = require("wujie-vue3").default;

export type PluginOpsWs = {
	wujieName: string;
	messageCallback?: (...p: any[]) => { type: string, data: any };
};

const defaultOps = {
	wujieName: 'gislifeMap',
	messageCallback: (...msgs) => {
		return msgs[0]
	},
};

export default function createWuJieVue3Plugin(options:PluginOpsWs) {
	const mergedOps = mergeOps(defaultOps, options);
	const {
		messageCallback,
		wujieName
	} = mergedOps;


	const { bus } = WuJiePackage;
	return {
		install(connector) {
			const msgProcess = (...params) => {
				const buildMsg = messageCallback(...params);
				connector.$send({
					target: wujieName,
					...buildMsg
				});
				connector.on((msg) => {
					bus.$emit(wujieName + '-Receive', {
						type: msg.type,
						response: connector._getResponse(msg)
					})
				})
			};

			bus.$on(wujieName, msgProcess);
			return () => {
				bus.$off(wujieName, msgProcess);
				connector.unRegisterApp(wujieName);
			}
		}
	}
}
