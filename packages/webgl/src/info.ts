import { BlitLogger } from "@blit/core";

import * as Types from "./types";
import { GL_MAX_COLOR_ATTACHMENTS, GL_VERSION } from "./common";

function parseVersion(gl: Types.$GLContext, logger: BlitLogger) {
  const version = gl.getParameter(GL_VERSION),
    parsed = /([0-9]+)\.?([0-9]*)?/.exec(version);

  let majorVersion: number, minorVersion: number;

  if (parsed) {
    majorVersion = Number(parsed![1]);
    if (parsed![2]) {
      minorVersion = Number(parsed![2]);
    } else {
      if (process.env.NODE_ENV !== "production") {
        logger.warn(
          `Unable to parse minor version in '${version}', assumed to be ${majorVersion}.0`
        );
      }
      minorVersion = 0;
    }
  } else {
    if (process.env.NODE_ENV !== "production") {
      logger.warn(
        `Unable to parse version string '${version}', fell back to 1.0`
      );
    }
    majorVersion = 1;
    minorVersion = 0;
  }
  return { majorVersion, minorVersion };
}

export default function info(gl: Types.$GLContext, logger: BlitLogger) {
  const { majorVersion, minorVersion } = parseVersion(gl, logger);
  return {
    majorVersion,
    minorVersion,
    maxColorTargets: gl.getParameter(GL_MAX_COLOR_ATTACHMENTS)
  };
}
