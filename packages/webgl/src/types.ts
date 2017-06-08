import { BlitInstanceInfo, BlitInstanceOptions } from '@blit/core';

/* Instance */
export type BlitWebGLInstanceInfo = {
  majorVersion: number;
  minorVersion: number;
} & BlitInstanceInfo;

export type BlitWebGLInstanceOptions = {
} & BlitInstanceOptions;

export type $GLContext = WebGLRenderingContext | WebGL2RenderingContext;
