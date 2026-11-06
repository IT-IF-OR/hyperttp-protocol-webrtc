# Tests

`protocol.test.ts` covers sender/receiver mapping, SDP and ICE validation, peer headers,
transport capability checks, timeout cleanup on success/failure, cancellation,
response normalization, and configured handlers.

Run `bun run test` and `bun run test:typecheck`.
Tests use transport stubs; real WebRTC negotiation and interoperability remain the
responsibility of integration tests with a WebRTC-aware transport.

## Runtime checks

Install development dependencies with `bun install`. Node.js, Bun, and Deno must
also be installed and available on `PATH` to run their respective checks.

- `bun run typecheck:shared` checks the source against ES2022 and DOM types,
  without automatically included runtime-specific ambient types.
- `bun run typecheck:node`, `bun run typecheck:bun`, and
  `bun run typecheck:deno` check the source and respective runtime entry point
  with that runtime's ambient types. Bun's own types include Node compatibility
  types; these checks do not claim to exclude APIs provided by those types.
- `bun run test:node`, `bun run test:bun`, and `bun run test:deno` run the
  full Vitest suite and a protocol initialization smoke test in the named runtime.
  The suite verifies its runtime. Node uses `tsx` for the smoke test; Deno uses
  `--unstable-sloppy-imports` for source `.js` specifiers and `-A` for Vitest.
  Run Deno tests only on trusted code. These tests do not exercise real WebRTC
  negotiation.
- `bun run test` runs the full Vitest suite under Node.js, and
  `bun run test:typecheck` typechecks that suite.
