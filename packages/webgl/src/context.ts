import { $, BlitLogger, BlitContext } from "@blit/core";

import * as Types from "./types";
import createInfo from "./info";
import createCapabilities from "./capabilities";
import createPhysicalDevice from "./physicalDevice";
import createLogicalDevice from "./logicalDevice";

function getPhysicalDevices() {
  return [createPhysicalDevice()];
}

export default function context(
  options?: Types.BlitWebGLContextOptions
): {
  $gl: Types.$WebGLContext;
  $logger: BlitLogger;
  $glCapabilities: Types.$WebGLContextCapabilities;
} & BlitContext {
  const canvas = document.createElement("canvas");
  const $logger = $.logger(options && options.log ? options.log : undefined),
    $gl = canvas.getContext("webgl2")! as WebGL2RenderingContext,
    info = createInfo($gl, $logger),
    capabilities = createCapabilities($gl, info);
  return {
    info,
    capabilities: capabilities.context,
    getPhysicalDevices,
    createLogicalDevice: () => createLogicalDevice($gl, $logger),
    $logger,
    $gl,
    $glCapabilities: capabilities.gl
  };
}
