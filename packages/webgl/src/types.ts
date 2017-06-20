import {
  BlitContextInfo,
  BlitContextOptions,
  BlitShaderModule,
  ShaderStage,
  BlitGraphicsPipeline
} from "@blit/core";

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
  $source: string;
} & BlitShaderModule;

export type BlitWebGLPipelineShaderStage = {
  $handle: WebGLShader;
  $stage: ShaderStage;
} & BlitShaderModule;

export type $ShaderCache = {
  [index: number]: WeakMap<BlitShaderModule, WebGLShader>
}

/* Graphics Pipeline */
export type $Program = WebGLProgram;

export type BlitWebGLGraphicsPipeline = {
  $program: $Program;
} & BlitGraphicsPipeline;

export type BlitWebGLPipelineShaderStageCreateInfo = {
  name: string;
  module: BlitWebGLShaderModule;
}

export type BlitWebGLGraphicsPipelineCreateInfo = {
  stages: {[index: number]: BlitWebGLPipelineShaderStageCreateInfo}
}

/* WebGL */
export type $WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;
