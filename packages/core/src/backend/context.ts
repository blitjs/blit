import logger, { BlitLogger, BlitLoggerOptions } from "../logger";
import { BlitInfo } from "./info";

export interface BlitContext {
  $info: BlitInfo;
  $logger: BlitLogger;
}

export interface BlitContextOptions {
  log?: BlitLoggerOptions;
}

export abstract class Context implements BlitContext {
  public $info: BlitInfo;
  public $logger: BlitLogger;

  public constructor(options: BlitContextOptions) {
    this.$logger = logger(options.log);
  }
}
