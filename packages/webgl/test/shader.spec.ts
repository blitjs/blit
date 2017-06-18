import { $, ShaderStage } from "@blit/core";

import { development, production } from "../../../shared/environment";

import { createShaderModule } from "../src/shader";

const createGL = (version?: number) =>
  document
    .createElement("canvas")
    .getContext(version === 1 ? "webgl" : "webgl2") as WebGL2RenderingContext;

describe("shader", () => {
  it("should compile an valid shader", () => {
    const gl = createGL(1),
      shader = createShaderModule(
        gl,
        $.logger(),
        ShaderStage.VERTEX,
        `void main() { gl_Position = vec4(1); }`
      );
    expect(shader).toBeDefined();
    expect(shader.$handle).toBeDefined();
  });

  it("should format expected shader errors", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message);

    // Formatted error
    createShaderModule(gl, $.logger({ handler }), ShaderStage.VERTEX, "x");
    expect(error).toContain("line 1");
  });

  it("should not format unexpected shader errors", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message);

    // Irregular formatting error
    gl.getShaderInfoLog = () => "ERROR 0:1 ERROR";
    createShaderModule(gl, $.logger({ handler }), ShaderStage.VERTEX, "");
    expect(error).toContain("ERROR");

    // `null` error
    gl.getShaderInfoLog = () => null;
    createShaderModule(gl, $.logger({ handler }), ShaderStage.VERTEX, "");
    expect(error).toContain("shader compilation error");
  });

  it("should fail when shader cannot be created", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message);

    // Irregular formatting error
    gl.createShader = () => null;
    try {
      createShaderModule(
        gl,
        $.logger({ handler }),
        ShaderStage.VERTEX,
        "`void main() { gl_Position = vec4(1); }`"
      );
    } catch (error) { // Unhandled errors from WebGL calls on a null handle
      expect(error).not.toContain("blit");
    }
    expect(error).toContain("cannot create shader");
  });

  it("should not check compilation status on production", () => {
    const gl = createGL();

    production();

    expect(() =>
      createShaderModule(gl, $.logger(), ShaderStage.VERTEX, "")
    ).not.toThrow();

    development();
  });
});
