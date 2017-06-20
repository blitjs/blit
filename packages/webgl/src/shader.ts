import { BlitLogger, ShaderStage } from "@blit/core";

import * as Types from "./types";
import { GL_COMPILE_STATUS, STAGE_TO_GL_SHADER_TYPE } from "./common";

function trim(message: string) {
  return message.replace(/^[\s\u0000]+|[\s\u0000]+$/g, "");
}

export function compileShader(
  source: string,
  gl: Types.$WebGLContext,
  logger: BlitLogger,
  stage: ShaderStage
) {
  const handle = gl.createShader(STAGE_TO_GL_SHADER_TYPE[stage])!;
  if (process.env.NODE_ENV !== "production") {
    if (handle === null) {
      logger.error("cannot create shader");
    }
  }
  gl.shaderSource(handle, source);
  gl.compileShader(handle);
  if (process.env.NODE_ENV !== "production") {
    const status = gl.getShaderParameter(handle, GL_COMPILE_STATUS);
    if (!status) {
      const info = gl.getShaderInfoLog(handle),
        expression = /((ERROR)|(WARNING)): ?[0-9]+\:([0-9]+): /g;
      if (info) {
        const matches = info.split(expression);
        if (matches.length >= 5 && (matches.length - 1) % 5 === 0) {
          matches.shift();
          for (let i = 0; i < matches.length; i += 5) {
            const lines = source.split("\n"),
              infoType = matches[i],
              row = +matches[i + 3],
              message = matches[i + 4],
              line = lines[row - 1];

            logger.error(
              `shader compilation ${infoType.toLowerCase()}\r\n> ${trim(
                message
              )}\r\nin line ${row}\r\n> ${trim(line)}`
            );
          }
        } else {
          logger.error(`shader compilation error\r\n${trim(info)}`);
        }
      } else {
        logger.error("shader compilation error");
      }
    }
  }
  return handle;
}

export function createShaderModule(source: string): Types.BlitWebGLShaderModule {
  return {
    $source: source
  };
}

export function createShaderCache() {
  return {
    [ShaderStage.VERTEX]: new WeakMap<Types.BlitWebGLShaderModule, WebGLShader>(),
    [ShaderStage.FRAGMENT]: new WeakMap<Types.BlitWebGLShaderModule, WebGLShader>()
  }
}
