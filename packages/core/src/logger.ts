import * as Types from "./types";

function addPrefix(message: string) {
  return `blit/${message}`;
}

function wrapHandler(handler: Types.BlitLogHandler, shouldThrow: boolean) {
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

export default function logger(
  options?: Types.BlitLoggerOptions
): Types.BlitLogger {
  let handler: Types.BlitLogFunction | undefined,
    errorHandler: Types.BlitLogFunction | undefined;

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
