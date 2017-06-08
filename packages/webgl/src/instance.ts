import * as Types from "./types";
import { $, BlitLogger } from "@blit/core";

import info from "./info";

export default function instance(
  options: Types.BlitWebGLInstanceOptions
): { $gl: Types.$GLContext; $logger: BlitLogger; $info: Types.BlitWebGLInstanceInfo } {
  const canvas = document.createElement("canvas");
  const $logger = $.logger(options.log),
    $gl = canvas.getContext("webgl2")! as WebGL2RenderingContext;
  return {
    $logger,
    $gl,
    $info: info($gl, $logger)
  };
}
