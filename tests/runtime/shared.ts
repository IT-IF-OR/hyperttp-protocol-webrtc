import { createWebRtcProtocol } from "../../src/index.js";

export function smokeTest(runtime: "node" | "bun" | "deno") {
  const globals = globalThis as typeof globalThis & {
    Bun?: unknown;
    Deno?: unknown;
    process?: { versions?: { node?: string } };
  };
  const actual = globals.Deno ? "deno" : globals.Bun ? "bun" : globals.process?.versions?.node ? "node" : "unknown";
  if (actual !== runtime) throw new Error(`Expected ${runtime}, got ${actual}`);

  const protocol = createWebRtcProtocol();
  if (protocol.protocol !== "webrtc" || !protocol.sender || !protocol.receiver) {
    throw new Error("WebRTC protocol initialization failed");
  }
  console.log(`WebRTC protocol smoke test passed on ${actual}`);
}
