import type { HyperSender, HyperTransport, RequestContext, SendRequest, TransportResponse, UniversalResponse } from "@hyperttp/types";
import type { WebRtcInput, WebRtcTransportRequest } from "./types/index.js";
export declare class WebRtcSender implements HyperSender<WebRtcInput, unknown, WebRtcTransportRequest, TransportResponse> {
    readonly protocol = "webrtc";
    readonly methods: Readonly<Record<string, (...args: any[]) => any>>;
    prepare(request: SendRequest<WebRtcInput, string>, ctx: RequestContext): WebRtcTransportRequest;
    send(prepared: WebRtcTransportRequest, transport: HyperTransport, _ctx: RequestContext): Promise<TransportResponse>;
    parse(raw: TransportResponse, _ctx: RequestContext): UniversalResponse<unknown>;
    private dispatch;
}
//# sourceMappingURL=sender.d.ts.map