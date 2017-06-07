/// <reference types="webgl2" />
import { $, BlitContext, BlitContextOptions } from "@blit/core";
export interface BlitWebGLContextOptions extends BlitContextOptions {
}
export declare class WebGLContext extends $.Context implements BlitContext {
    $gl: WebGLRenderingContext | WebGL2RenderingContext;
    constructor(options: BlitWebGLContextOptions);
}
export default function context(options: BlitWebGLContextOptions): WebGLContext;
