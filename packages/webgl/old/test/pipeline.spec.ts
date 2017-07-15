import { $, ShaderStage } from "@blit/core";

import { development, production } from "../../../shared/environment";

import { createGraphicsPipelines } from "../src/pipeline";
import { createShaderModule, createShaderCache } from "../src/shader";

import { createGL } from "./helpers/createGL.spec";

describe("pipeline", () => {
  const vertexShaderModule = createShaderModule(
    `void main() { gl_Position = vec4(1); }`
  ),
    fragmentShaderModule = createShaderModule(
      `void main() { gl_FragColor = vec4(1); }`
    );

  let gl: { context: WebGL2RenderingContext; destroy(): void };

  beforeEach(() => {
    gl = createGL();
  });

  afterEach(() => {
    gl.destroy();
  });

  it("should create a graphics pipeline", () => {
    const createPipeline = () => createGraphicsPipelines(
        [
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
        ],
        gl.context,
        $.logger(),
        createShaderCache()
      );

    // Development
    expect(createPipeline()).toBeDefined();

    // Production
    production();
    expect(createPipeline()).toBeDefined();
    development();
  });

  it("should use shader cache to avoid recompilation", () => {
    let times = 0;
    const original = gl.context.compileShader.bind(gl.context);
    gl.context.compileShader = (shader: WebGLShader) => {
      times++;
      return original(shader);
    };
    const shaderCache = createShaderCache(),
      createPipeline = () =>
        createGraphicsPipelines(
          [
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
          ],
          gl.context,
          $.logger(),
          shaderCache
        );
    createPipeline();
    createPipeline();
    createPipeline();
    expect(times).toBe(2); // Once for each vertex/fragment shader
  });

  it("fails when no vertex shader provided", () => {
    let firstError: string | undefined;
    try {
      createGraphicsPipelines(
        [
          {
            stages: {
              [ShaderStage.FRAGMENT]: {
                module: fragmentShaderModule,
                name: "main"
              }
            }
          }
        ],
        gl.context,
        $.logger({
          handler: message => {
            if (!firstError) {
              firstError = message;
            }
          }
        }),
        createShaderCache()
      );
    } catch (_) {}
    expect(firstError).toContain("no vertex shader was provided");
  });

  it("fails when no fragment shader provided", () => {
    let firstError: string | undefined;
    try {
      createGraphicsPipelines(
        [
          {
            stages: {
              [ShaderStage.VERTEX]: {
                module: vertexShaderModule,
                name: "main"
              }
            }
          }
        ],
        gl.context,
        $.logger({
          handler: message => {
            if (!firstError) {
              firstError = message;
            }
          }
        }),
        createShaderCache()
      );
    } catch (_) {}
    expect(firstError).toContain("no fragment shader was provided");
  });

  it("fails when invalid stage type provided", () => {
    let firstError: string | undefined;
    try {
      createGraphicsPipelines(
        [
          {
            stages: {
              [-1]: {
                module: vertexShaderModule,
                name: "main"
              },
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
        ],
        gl.context,
        $.logger({
          handler: message => {
            if (!firstError) {
              firstError = message;
            }
          }
        }),
        createShaderCache()
      );
    } catch (_) {}
    expect(firstError).toContain("unsupported shader type (-1)");
  });

  it("fails when program cannot be created", () => {
    let firstError: string | undefined;
    gl.context.createProgram = () => null;
    try {
      createGraphicsPipelines(
        [
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
        ],
        gl.context,
        $.logger({
          handler: message => {
            if (!firstError) {
              firstError = message;
            }
          }
        }),
        createShaderCache()
      );
    } catch (_) {}
    expect(firstError).toContain("cannot create program");
  });

  it("fails when program cannot be linked", () => {
    let firstError: string | undefined;
    gl.context.linkProgram = () => null;
    try {
      createGraphicsPipelines(
        [
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
        ],
        gl.context,
        $.logger({
          handler: message => {
            if (!firstError) {
              firstError = message;
            }
          }
        }),
        createShaderCache()
      );
    } catch (_) {}
    expect(firstError).toContain("cannot link program");
  });
});
