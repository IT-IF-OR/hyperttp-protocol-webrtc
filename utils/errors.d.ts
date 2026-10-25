export declare class HyperClientError extends Error {
    code: string;
    statusCode?: number | undefined;
    originalError?: Error | undefined;
    url?: string | undefined;
    method?: string | undefined;
    constructor(message: string, code?: string, statusCode?: number | undefined, originalError?: Error | undefined, url?: string | undefined, method?: string | undefined);
    static isHyperClientError(err: unknown): err is HyperClientError;
}
export declare class TimeoutError extends HyperClientError {
    constructor(url: string, timeout: number);
    static isTimeoutError(err: unknown): err is TimeoutError;
}
//# sourceMappingURL=errors.d.ts.map