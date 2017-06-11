import { BlitLogger } from "@blit/core";

import * as Types from "./types";
import { GL_VERSION } from "./common";

function getVersion(gl: Types.$WebGLContext, logger: BlitLogger) {
  const version = gl.getParameter(GL_VERSION),
    parsed = /([0-9]+)\.?([0-9]*)?/.exec(version);

  let major: number, minor: number;

  if (parsed) {
    major = Number(parsed![1]);
    if (parsed![2]) {
      minor = Number(parsed![2]);
    } else {
      if (process.env.NODE_ENV !== "production") {
        logger.warn(
          `Unable to parse minor version in '${version}', assumed to be ${major}.0`
        );
      }
      minor = 0;
    }
  } else {
    if (process.env.NODE_ENV !== "production") {
      logger.warn(
        `Unable to parse version string '${version}', fell back to 1.0`
      );
    }
    major = 1;
    minor = 0;
  }
  return { major, minor };
}

export function isSupported(
  info: Types.BlitWebGLContextInfo,
  requiredMajor: number,
  requiredMinor: number,
  ...extensions: string[]
) {
  const { version } = info;
  if (version.major >= requiredMajor && version.minor >= requiredMinor) {
    return true;
  }
  for (const extension of extensions) {
    if (info.extensions.includes(extension)) {
      return true;
    }
  }
  return false;
}

export default function info(
  gl: Types.$WebGLContext,
  logger: BlitLogger
): Types.BlitWebGLContextInfo {
  return {
    version: getVersion(gl, logger),
    extensions: gl.getSupportedExtensions() || []
  };
}
