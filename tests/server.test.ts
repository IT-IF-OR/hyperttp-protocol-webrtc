import { describe, expect, it, vi } from "vitest";
import type {
  HyperServerListenOptions,
  ProtocolServerHost,
  TransportRequest,
} from "@hyperttp/types";
import { createWebRtcProtocol } from "../src/index.js";
import { createWebRtcServer } from "../src/server.js";

type Listener = Omit<HyperServerListenOptions<"webrtc">, "port" | "host" | "signal">;

function fixture() {
  let listener: Listener | undefined;
  const server = { configured: true };
  const services = { token: "secret", close: vi.fn() };
  const host: ProtocolServerHost<typeof services, typeof server> = {
    services,
    configure: (options) => {
      if (listener) throw new Error("already configured");
      listener = options as unknown as Listener;
      return server;
    },
  };
  return { services, server, facade: createWebRtcServer(host), listener: () => listener! };
}

describe("protocol-owned server facade", () => {
  it("exposes a factory without depending on hyperttp", () => {
    expect(createWebRtcProtocol().server).toBe(createWebRtcServer);
  });

  it("injects services into authorization and a typed handler", async () => {
    const { facade, server, services, listener } = fixture();
    expect(
      facade.signal("/calls", {
        authorize: ({ request, services }) => request.headers.authorization === services.token,
        handler: ({ request, services }) => ({ payload: [request.action, services.token] }),
      }),
    ).toBe(server);
    const options = listener();
    expect(options.protocol).toBe("webrtc");
    expect(options.signaling?.path).toBe("/calls");
    const request: TransportRequest = {
      protocol: "webrtc",
      method: "POST",
      url: "/calls",
      headers: { authorization: "secret" },
    };
    expect(await options.signaling?.authorize?.(request)).toBe(true);
    expect(await options.signaling?.authorize?.({ ...request, headers: {} })).toBe(false);
    expect(
      await options.handler!(
        { action: "connect", peerId: "peer", headers: {} },
        {
          requestId: "test",
          startTime: 0,
          meta: {},
          state: {},
        },
      ),
    ).toEqual({ payload: ["connect", "secret"] });
    expect(services.close).not.toHaveBeenCalled();
    expect(() => facade.signal("/other", { handler: () => ({}) })).toThrow("already configured");
  });

  it.each([
    "signal",
    "//host/signal",
    "/signal?x=1",
    "/a/../signal",
    "/signal#hash",
    "/sig nal",
    "/sig\\nal",
  ])("rejects malformed signaling path %s", (path) => {
    expect(() => fixture().facade.signal(path, { handler: () => ({}) })).toThrow("pathname");
  });
});

// Compile-time contracts are not executed.
function typeContracts() {
  fixture().facade.signal("/signal", {
    handler: ({ request, services }) => {
      const action: string = request.action;
      const token: string = services.token;
      // @ts-expect-error The protocol defines the request shape.
      void request.missing;
      // @ts-expect-error Services retain the application-owned shape.
      void services.missing;
      return { payload: [action, token] };
    },
  });
  fixture().facade.signal("/signal", {
    // @ts-expect-error A protocol response cannot be a string.
    handler: () => "invalid",
  });
}
void typeContracts;
