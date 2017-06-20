import { $ } from "@blit/core";

import createInfo from "../src/info";
import createCapabilities from "../src/capabilities";
import { GL_MAX_COLOR_ATTACHMENTS } from "../src/common";

import { createGL } from "./helpers/createGL.spec";

describe("capabilities", () => {
  it("should populate max color targets", () => {
    const gl = createGL(2);
    expect(
      createCapabilities(gl.context, createInfo(gl.context, $.logger())).context.maxColorTargets
    ).toBeGreaterThanOrEqual(1);
    gl.destroy();
  });

  it("should populate draw buffers supported", () => {
    const gl1 = createGL(1);
    gl1.context.getSupportedExtensions = () => null;
    const created1 = createCapabilities(gl1.context, createInfo(gl1.context, $.logger()));
    expect(created1.gl.drawBuffersSupported).toBe(false);
    expect(created1.context.maxColorTargets).toBe(1);
    gl1.destroy();

    const gl1Ext = createGL(1),
      colorTargets = 8;
    let original = gl1Ext.context.getParameter.bind(gl1Ext.context);
    gl1Ext.context.getSupportedExtensions = () => ["WEBGL_draw_buffers"];
    gl1Ext.context.getParameter = (parameter: number) =>
      parameter === GL_MAX_COLOR_ATTACHMENTS
        ? colorTargets
        : original(parameter);
    const created1Ext = createCapabilities(
      gl1Ext.context,
      createInfo(gl1Ext.context, $.logger())
    );
    expect(created1Ext.gl.drawBuffersSupported).toBe(true);
    expect(created1Ext.context.maxColorTargets).toBe(colorTargets);
    gl1Ext.destroy();

    const gl2 = createGL(2);
    original = gl2.context.getParameter.bind(gl2.context);
    gl2.context.getParameter = (parameter: number) =>
      parameter === GL_MAX_COLOR_ATTACHMENTS
        ? colorTargets
        : original(parameter);
    const created2 = createCapabilities(gl2.context, createInfo(gl2.context, $.logger()));
    expect(created2.gl.drawBuffersSupported).toBe(true);
    expect(created2.context.maxColorTargets).toBe(colorTargets);
    gl2.destroy();
  });

  it("should populate instanced arrays supported", () => {
    const gl1 = createGL(1);
    gl1.context.getSupportedExtensions = () => ["ANGLE_instanced_arrays"];
    const created1 = createCapabilities(gl1.context, createInfo(gl1.context, $.logger()));
    expect(created1.gl.instancedArraysSupported).toBe(true);
    gl1.destroy();

    const gl2 = createGL(2),
      created2 = createCapabilities(gl2.context, createInfo(gl2.context, $.logger()));
    expect(created2.gl.instancedArraysSupported).toBe(true);
    gl1.destroy();
  });
});
