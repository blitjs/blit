import { $, ShaderStage } from "@blit/core";

import createLogicalDevice from "../src/logicalDevice";

const createGL = () => document.createElement("canvas").getContext("webgl");

describe("logical device", () => {
  it("should create a physical device", () => {
    const gl = createGL();
    expect(createLogicalDevice(gl, $.logger())).toBeDefined();
  });

  it("should create a shader module", () => {
    const gl = createGL();
    expect(
      createLogicalDevice(gl, $.logger()).createShaderModule(
        ShaderStage.VERTEX,
        `void main() { gl_Position = vec4(1); }`
      )
    ).toBeDefined();
  });
});
