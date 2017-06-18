import {
  BlitLogicalDevice,
  BlitLogger,
  ShaderStage
} from "@blit/core";

import * as Types from "./types";
import { createShaderModule } from "./shader";

export default function logicalDevice(
  gl: Types.$WebGLContext,
  logger: BlitLogger
): BlitLogicalDevice {
  return {
    createShaderModule: (stage: ShaderStage, source: string) =>
      createShaderModule(gl, logger, stage, source)
  };
}
