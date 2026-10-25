import type { HyperProtocol } from "@hyperttp/types";
import type { WebRtcInput, WebRtcServerInput, WebRtcServerResponse, WebRtcServerHandler } from "./types/index.js";
export declare function createWebRtcProtocol(options?: {
    handler?: WebRtcServerHandler;
}): HyperProtocol<WebRtcInput, unknown, WebRtcServerInput, WebRtcServerResponse, "webrtc">;
export declare const WebRtcProtocol: HyperProtocol<WebRtcInput, unknown, WebRtcServerInput, WebRtcServerResponse, "webrtc">;
export { WebRtcReceiver } from "./receiver.js";
export { WebRtcSender } from "./sender.js";
export type { WebRtcTransportRequest, WebRtcAction, WebRtcInput, WebRtcLocalStream, WebRtcRequestOptions, WebRtcServerInput, WebRtcServerResponse, WebRtcServerHandler, WebRtcClientMethods, } from "./types/index.js";
//# sourceMappingURL=index.d.ts.map