import type {
  ProtocolRouteContext,
  ProtocolSignalOptions,
  ProtocolSignalMethods,
  ProtocolServerHost,
  TransportRequest,
} from "@hyperttp/types";
import type { WebRtcServerInput, WebRtcServerResponse } from "./types/index.js";

export type WebRtcRouteContext<Services> = ProtocolRouteContext<"webrtc", Services>;

export type WebRtcSignalOptions<Services> = ProtocolSignalOptions<"webrtc", Services>;
export type WebRtcServerMethods<Services, Server> = ProtocolSignalMethods<
  "webrtc",
  Services,
  Server
>;

declare module "@hyperttp/types" {
  interface HyperServerProtocols<_Services, _Server> {
    readonly webrtc: WebRtcServerMethods<_Services, _Server>;
  }
}

export function createWebRtcServer<Services, Server>(
  host: ProtocolServerHost<Services, Server>,
): WebRtcServerMethods<Services, Server> {
  return {
    signal(path, options) {
      if (
        !path.startsWith("/") ||
        path.startsWith("//") ||
        /[?#\\\s]/u.test(path) ||
        [...path].some((char) => char.codePointAt(0)! < 32 || char.codePointAt(0) === 127) ||
        new URL(path, "http://localhost").pathname !== path
      ) {
        throw new Error("[WebRtcProtocol] Signaling path must be an absolute literal pathname.");
      }
      const { authorize, handler } = options;
      return host.configure<"webrtc">({
        protocol: "webrtc",
        signaling: {
          path,
          ...(authorize
            ? {
                authorize: (request: TransportRequest) =>
                  authorize({ request, services: host.services }),
              }
            : {}),
        },
        handler: (
          request: WebRtcServerInput,
          context,
        ): WebRtcServerResponse | Promise<WebRtcServerResponse> =>
          handler({ request, context, services: host.services }),
      });
    },
  };
}
