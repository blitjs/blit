import {
  BlitShaderModule,
  BlitLogger,
  ShaderStage
} from "@blit/core";

import * as Types from "./types";
import { GL_COMPILE_STATUS, STAGE_TO_GL_SHADER_TYPE } from "./common";

export function createShaderModule(
  gl: Types.$WebGLContext,
  logger: BlitLogger,
  stage: ShaderStage,
  source: string
): BlitShaderModule {
  const handle = gl.createShader(STAGE_TO_GL_SHADER_TYPE[stage]);
  gl.shaderSource(handle, source);
  gl.compileShader(handle);
  if (process.env.NODE_ENV !== "production") {
    const status = gl.getShaderParameter(handle, GL_COMPILE_STATUS);
    if (!status) {
      logger.error(`Cannot compile shader: ${gl.getShaderInfoLog(handle)}`);
    }
  }
  return {};
}
