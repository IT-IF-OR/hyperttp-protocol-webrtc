export declare function createTimeoutSignal(userSignal: AbortSignal | undefined, timeoutMs: number, meta: {
    cleanupSignal?: () => void;
}, timeoutReason?: unknown | (() => unknown)): AbortSignal;
export declare function applyTimeout(signal: AbortSignal | undefined, timeout: number | undefined, meta: {
    cleanupSignal?: () => void;
}, timeoutReason?: unknown | (() => unknown)): AbortSignal | undefined;
//# sourceMappingURL=abort.d.ts.map