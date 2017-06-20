import { BlitLogger, ShaderStage } from "@blit/core";

import * as Types from "./types";
import { GL_LINK_STATUS } from "./common";
import { compileShader } from "./shader";

function createProgram(
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
  gl: Types.$WebGLContext,
  logger: BlitLogger
) {
  const program = gl.createProgram()!;
  if (process.env.NODE_ENV !== "production") {
    if (!program) {
      logger.error("cannot create program");
    }
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (process.env.NODE_ENV !== "production") {
    const status = gl.getProgramParameter(program, GL_LINK_STATUS);
    if (!status) {
      logger.error(`cannot link program: "${status}"`);
    }
  }

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);

  return program;
}

function validateShaders(
  vertexShader: WebGLShader | undefined,
  fragmentShader: WebGLShader | undefined,
  logger: BlitLogger
) {
  if (!vertexShader) {
    logger.error("no vertex shader was provided");
  }
  if (!fragmentShader) {
    logger.error("no fragment shader was provided");
  }
}

function createPipeline(
  pipelineCreateInfo: Types.BlitWebGLGraphicsPipelineCreateInfo,
  gl: Types.$WebGLContext,
  logger: BlitLogger,
  shaderCache: Types.$ShaderCache
): Types.BlitWebGLGraphicsPipeline {
  const { stages } = pipelineCreateInfo;
  let vertexShader: WebGLShader | undefined,
    fragmentShader: WebGLShader | undefined;

  if (process.env.NODE_ENV !== "production") {
    validateShaders(stages[ShaderStage.VERTEX], stages[ShaderStage.FRAGMENT], logger);
  }

  for (const stageType in stages) {
    const stageInfo = stages[stageType],
      stage = +stageType,
      { module } = stageInfo,
      stageShaderCache = shaderCache[stage];

    if (process.env.NODE_ENV !== "production") {
      if (!stageShaderCache) {
        logger.error(`unsupported shader type (${stage})`);
      }
    }

    let handle = stageShaderCache.get(module);
    if (!handle) {
      handle = compileShader(stageInfo.module.$source, gl, logger, stage);
      stageShaderCache.set(module, handle);
    }

    switch (stage) {
      case ShaderStage.VERTEX:
        vertexShader = handle;
        break;
      case ShaderStage.FRAGMENT:
        fragmentShader = handle;
        break;
    }
  }

  return {
    $program: createProgram(vertexShader!, fragmentShader!, gl, logger)
  };
}

export function createGraphicsPipelines(
  pipelineCreateInfos: Types.BlitWebGLGraphicsPipelineCreateInfo[],
  gl: Types.$WebGLContext,
  logger: BlitLogger,
  shaderCache: Types.$ShaderCache
): Types.BlitWebGLGraphicsPipeline[] {
  return pipelineCreateInfos.map(info =>
    createPipeline(info, gl, logger, shaderCache)
  );
}
