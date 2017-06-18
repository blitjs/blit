import { BlitContextInfo, BlitContextOptions, BlitShaderModule } from "@blit/core";

/* Context */
export type BlitWebGLContextInfo = {
  version: {
    major: number;
    minor: number;
  };
  extensions: string[];
} & BlitContextInfo;

export type $WebGLContextCapabilities = {
  instancedArraysSupported: boolean;
  drawBuffersSupported: boolean;
};

export type BlitWebGLContextOptions = {} & BlitContextOptions;

/* Shader */
export type BlitWebGLShaderModule = {
  $handle: WebGLShader;
} & BlitShaderModule

/* WebGL */
export type $WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;
