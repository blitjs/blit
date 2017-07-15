import { $, ShaderStage } from "@blit/core";

import createDevice from "../src/device";

const createGL = () => document.createElement("canvas").getContext("webgl2")!;

describe("logical device", () => {
  it("should create a physical device", () => {
    const gl = createGL();
    expect(createDevice(gl, $.logger())).toBeDefined();
  });

  it("should create a shader module", () => {
    const gl = createGL();
    expect(
      createDevice(gl, $.logger()).createShaderModule(
        `void main() { gl_Position = vec4(1); }`
      )
    ).toBeDefined();
  });

  it("should create a graphics pipeline", () => {
    const gl = createGL(),
      device = createDevice(gl, $.logger()),
      vertexShaderModule = device.createShaderModule(`#version 300 es
        precision mediump float;
        out vec4 color;
        const vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));
        void main() {
          color = vec4(pos[gl_VertexID], 0.5, 1.0);
        }
      `),
      fragmentShaderModule = device.createShaderModule(`#version 300 es
        precision mediump float;
        layout(location = 0) out vec4 fragColor;
        void main() {
          fragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `),
      [pipeline] = device.createGraphicsPipelines([
        {
          stages: {
            [ShaderStage.VERTEX]: {
              module: vertexShaderModule,
              name: "main"
            },
            [ShaderStage.FRAGMENT]: {
              module: fragmentShaderModule,
              name: "main"
            }
          }
        }
      ]);
    expect(pipeline).toBeDefined();
  });
});
