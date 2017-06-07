export type BlitLogHandler = ((message: string, shouldThrow: boolean) => void);

export interface BlitLoggerOptions {
  handler: BlitLogHandler;
}

function addPrefix(message: string) {
  return "blit: " + message;
}

function wrapHandler(handler: BlitLogHandler, shouldThrow: boolean) {
  return function wrapped(message: string) {
    return handler(addPrefix(message), shouldThrow);
  };
}

function wrapConsole(
  logFunction: (message: string) => void,
  shouldThrow: boolean
) {
  return function wrapped(message: string) {
    message = addPrefix(message);
    logFunction(message);
    if (shouldThrow) {
      throw new Error(message);
    }
  };
}

export type BlitLogFunction = (message: string) => void;

export interface BlitLogger {
  log: BlitLogFunction;
  info: BlitLogFunction;
  warn: BlitLogFunction;
  error: BlitLogFunction;
}

export default function logger(options?: BlitLoggerOptions): BlitLogger {
  let handler: BlitLogFunction | undefined,
    errorHandler: BlitLogFunction | undefined;

  if (options) {
    handler = wrapHandler(options.handler, false);
    errorHandler = wrapHandler(options.handler, true);
  }

  return {
    log: handler || wrapConsole(console.log, false),
    info: handler || wrapConsole(console.info, false),
    warn: handler || wrapConsole(console.warn, false),
    error: errorHandler || wrapConsole(console.error, true)
  };
}
