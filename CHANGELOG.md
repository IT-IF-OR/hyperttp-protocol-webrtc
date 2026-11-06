# Changelog

## [0.3.0] - 2026-11-06

### Added

- Added support for an optional `iceGeneration` signaling field to correlate ICE candidates across generations. Opaque non-empty strings up to 256 characters and non-negative safe integers are accepted and preserved without conversion.
- Added explicit end-of-candidates support using either `candidate: null` or an empty candidate string. A candidate remains required for the `candidate` action.
- Exported the `WebRtcIceCandidate` type and added validation and serialization tests for candidates and generations.

### Notes

- This package carries and validates signaling data; it does not gather or apply ICE candidates, manage generations, or implement the signaling exchange itself. A compatible transport and application are required for Trickle ICE.
