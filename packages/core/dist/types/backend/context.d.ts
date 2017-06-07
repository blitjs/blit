import { BlitLogger, BlitLoggerOptions } from "../logger";
import { BlitInfo } from "./info";
export interface BlitContext {
    $info: BlitInfo;
    $logger: BlitLogger;
}
export interface BlitContextOptions {
    log?: BlitLoggerOptions;
}
export declare abstract class Context implements BlitContext {
    $info: BlitInfo;
    $logger: BlitLogger;
    constructor(options: BlitContextOptions);
}
