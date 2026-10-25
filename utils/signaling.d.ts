import type { WebRtcAction } from "../types/index.js";
export declare function invalidSignal(message: string): never;
export declare function parseSignal(value: unknown): {
    action: WebRtcAction;
    sessionId: string | undefined;
    offer: RTCSessionDescriptionInit | undefined;
    answer: RTCSessionDescriptionInit | undefined;
    candidate: RTCIceCandidateInit | undefined;
    payload: unknown;
};
//# sourceMappingURL=signaling.d.ts.map