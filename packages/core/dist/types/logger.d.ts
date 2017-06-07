export declare type BlitLogHandler = ((message: string, shouldThrow: boolean) => void);
export interface BlitLoggerOptions {
    handler: BlitLogHandler;
}
export declare type BlitLogFunction = (message: string) => void;
export interface BlitLogger {
    log: BlitLogFunction;
    info: BlitLogFunction;
    warn: BlitLogFunction;
    error: BlitLogFunction;
}
export default function logger(options?: BlitLoggerOptions): BlitLogger;
