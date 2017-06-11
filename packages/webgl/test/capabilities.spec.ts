import { $ } from "@blit/core";

import createInfo from "../src/info";
import createCapabilities from "../src/capabilities";
import { GL_MAX_COLOR_ATTACHMENTS } from "../src/common";

const createGL = (version: number) =>
  document
    .createElement("canvas")
    .getContext(version === 1 ? "webgl" : "webgl2") as WebGL2RenderingContext;

describe("capabilities", () => {
  it("should populate max color targets", () => {
    const gl = createGL(2);
    expect(
      createCapabilities(gl, createInfo(gl, $.logger())).context.maxColorTargets
    ).toBeGreaterThanOrEqual(1);
  });

  it("should populate draw buffers supported", () => {
    const gl1 = createGL(1);
    gl1.getSupportedExtensions = () => null;
    const created1 = createCapabilities(gl1, createInfo(gl1, $.logger()));
    expect(created1.gl.drawBuffersSupported).toBe(false);
    expect(created1.context.maxColorTargets).toBe(1);

    const gl1Ext = createGL(1),
      colorTargets = 8;
    let original = gl1Ext.getParameter.bind(gl1Ext);
    gl1Ext.getSupportedExtensions = () => ["WEBGL_draw_buffers"];
    gl1Ext.getParameter = (parameter: number) =>
      parameter === GL_MAX_COLOR_ATTACHMENTS
        ? colorTargets
        : original(parameter);
    const created1Ext = createCapabilities(gl1Ext, createInfo(gl1Ext, $.logger()));
    expect(created1Ext.gl.drawBuffersSupported).toBe(true);
    expect(created1Ext.context.maxColorTargets).toBe(colorTargets);

    const gl2 = createGL(2);
    original = gl2.getParameter.bind(gl2);
    gl2.getParameter = (parameter: number) =>
      parameter === GL_MAX_COLOR_ATTACHMENTS
        ? colorTargets
        : original(parameter);
    const created2 = createCapabilities(gl2, createInfo(gl2, $.logger()));
    expect(created2.gl.drawBuffersSupported).toBe(true);
    expect(created2.context.maxColorTargets).toBe(colorTargets);
  });

  it("should populate instanced arrays supported", () => {
    const gl1 = createGL(1);
    gl1.getSupportedExtensions = () => ["ANGLE_instanced_arrays"];
    const created1 = createCapabilities(gl1, createInfo(gl1, $.logger()));
    expect(created1.gl.instancedArraysSupported).toBe(true);

    const gl2 = createGL(2),
      created2 = createCapabilities(gl2, createInfo(gl2, $.logger()));
    expect(created2.gl.instancedArraysSupported).toBe(true);
  });
});
