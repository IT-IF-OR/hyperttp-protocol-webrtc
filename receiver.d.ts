import type { HyperReceiver, ServerRequestContext, TransportRequest, TransportResponse } from "@hyperttp/types";
import type { WebRtcServerHandler, WebRtcServerInput, WebRtcServerResponse } from "./types/index.js";
export declare class WebRtcReceiver implements HyperReceiver<WebRtcServerInput, WebRtcServerResponse, TransportRequest, TransportResponse> {
    readonly protocol = "webrtc";
    protected readonly handler: WebRtcServerHandler | undefined;
    constructor(options?: {
        handler?: WebRtcServerHandler;
    });
    receive(raw: TransportRequest, _ctx: ServerRequestContext): WebRtcServerInput;
    handle(request: WebRtcServerInput, ctx: ServerRequestContext): WebRtcServerResponse | Promise<WebRtcServerResponse>;
    respond(response: WebRtcServerResponse, _ctx: ServerRequestContext): TransportResponse;
}
//# sourceMappingURL=receiver.d.ts.map