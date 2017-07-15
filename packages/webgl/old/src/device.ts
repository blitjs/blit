import { BlitLogicalDevice, BlitLogger } from "@blit/core";

import * as Types from "./types";
import { createShaderModule, createShaderCache } from "./shader";
import { createGraphicsPipelines } from "./pipeline";

export default function device(
  gl: Types.$WebGLContext,
  logger: BlitLogger
): BlitLogicalDevice {
  const shaderCache = createShaderCache();
  return {
    createShaderModule,
    createGraphicsPipelines: (
      pipelineCreateInfos: Types.BlitWebGLGraphicsPipelineCreateInfo[]
    ) => createGraphicsPipelines(pipelineCreateInfos, gl, logger, shaderCache)
  };
}

/*export function deviceProxy() {
  return {
    createShaderModule
  }
}*/
