import type { ProtocolRouteContext, ProtocolSignalOptions, ProtocolSignalMethods, ProtocolServerHost } from "@hyperttp/types";
export type WebRtcRouteContext<Services> = ProtocolRouteContext<"webrtc", Services>;
export type WebRtcSignalOptions<Services> = ProtocolSignalOptions<"webrtc", Services>;
export type WebRtcServerMethods<Services, Server> = ProtocolSignalMethods<"webrtc", Services, Server>;
declare module "@hyperttp/types" {
    interface HyperServerProtocols<_Services, _Server> {
        readonly webrtc: WebRtcServerMethods<_Services, _Server>;
    }
}
export declare function createWebRtcServer<Services, Server>(host: ProtocolServerHost<Services, Server>): WebRtcServerMethods<Services, Server>;
//# sourceMappingURL=server.d.ts.map