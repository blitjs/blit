/* Instance */
export type BlitInstanceInfo = { maxColorTargets: number };

export type BlitInstanceOptions = { log?: BlitLoggerOptions };

/* Logger */
export type BlitLogHandler = ((message: string, shouldThrow: boolean) => void);

export type BlitLoggerOptions = {
  handler: BlitLogHandler;
};

export type BlitLogFunction = (message: string) => void;

export type BlitLogger = {
  log: BlitLogFunction;
  info: BlitLogFunction;
  warn: BlitLogFunction;
  error: BlitLogFunction;
};
