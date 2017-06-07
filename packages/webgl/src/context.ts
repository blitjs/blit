import { $, BlitContext, BlitContextOptions } from "@blit/core";

import info from "./info";

export interface BlitWebGLContextOptions extends BlitContextOptions {}

export class WebGLContext extends $.Context implements BlitContext {
  public $gl: WebGLRenderingContext | WebGL2RenderingContext;

  public constructor(options: BlitWebGLContextOptions) {
    super(options);
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2")! as WebGL2RenderingContext;
    this.$gl = gl;
    this.$info = info(this);
  }
}

export default function context(options: BlitWebGLContextOptions) {
  return new WebGLContext(options);
}
