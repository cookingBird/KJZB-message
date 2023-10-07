import { mergeOps } from "../src/util"
const defaultOps = {
	wujieName: 'gislifeMap',
	url: '',
	messageCallback: (msg) => {
		return msg
	},
	afterOpen: (ws) => { },
	afterClose: (ws) => { },
	afterMessage: (ws) => { },
};

export default function createWuJiePlugin(options) {
	//@ts-expect-error
	if (!window.__POWERED_BY_WUJIE__) {
		throw Error("__POWERED_BY_WUJIE__ is undefined");
	}

	const mergedOps = mergeOps(defaultOps, options);
	const {
		url,
		messageCallback,
		wujieName,
		afterOpen,
		afterClose,
		afterMessage
	} = mergedOps;
	if (!url) {
		throw Error('webSocket url is null')
	}
	return {
		install(connector) {
			const socket = new WebSocket(url);

			const onMessage = (msg) => {
				const buildMsg = messageCallback(msg);
				connector.$send({
					target: wujieName,
					...buildMsg
				});
				afterMessage(msg);
			};

			const onClose = () => {
				afterClose(socket);
			};

			const onOpen = () => {
				afterOpen(socket);
			};

			socket.addEventListener("open", onOpen);
			socket.addEventListener("message", onMessage);
			socket.addEventListener("close", onClose);

			return () => {
				socket.close();
				connector.unRegisterApp(wujieName);
			}
		}
	}
}
