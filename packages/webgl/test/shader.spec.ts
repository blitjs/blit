import { $, ShaderStage } from "@blit/core";

import { development, production } from "../../../shared/environment";

import { createShaderModule, compileShader } from "../src/shader";

const createGL = (version?: number) =>
  document
    .createElement("canvas")
    .getContext(version === 1 ? "webgl" : "webgl2") as WebGL2RenderingContext;

describe("shader", () => {
  it("should compile an valid shader", () => {
    const gl = createGL(1),
      shaderModule = createShaderModule(`void main() { gl_Position = vec4(1); }`),
      shader = compileShader(
        shaderModule.$source,
        gl,
        $.logger(),
        ShaderStage.VERTEX
      );
    expect(shader).toBeDefined();
  });

  it("should format expected shader errors", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message),
      shaderModule = createShaderModule("x");

    // Formatted error
    compileShader(shaderModule.$source, gl, $.logger({ handler }), ShaderStage.VERTEX);
    expect(error).toContain("line 1");
  });

  it("should not format unexpected shader errors", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message),
      shaderModule = createShaderModule("");

    // Irregular formatting error
    gl.getShaderInfoLog = () => "ERROR 0:1 ERROR";
    compileShader(shaderModule.$source, gl, $.logger({ handler }), ShaderStage.VERTEX);
    expect(error).toContain("ERROR");

    // `null` error
    gl.getShaderInfoLog = () => null;
    compileShader(shaderModule.$source, gl, $.logger({ handler }), ShaderStage.VERTEX);
    expect(error).toContain("shader compilation error");
  });

  it("should fail when shader cannot be created", () => {
    let error: string | undefined;
    const gl = createGL(),
      handler = (message: string) => (error = message),
      shaderModule = createShaderModule("`void main() { gl_Position = vec4(1); }`");

    // Irregular formatting error
    gl.createShader = () => null;
    try {
      compileShader(
        shaderModule.$source,
        gl,
        $.logger({ handler }),
        ShaderStage.VERTEX
      );
    } catch (_) {
      // Swallow unhandled exceptions
    }
    expect(error).toContain("cannot create shader");
  });

  it("should not check compilation status on production", () => {
    const gl = createGL(),
      shaderModule = createShaderModule("");

    production();

    expect(() =>
      compileShader(shaderModule.$source, gl, $.logger(), ShaderStage.VERTEX)
    ).not.toThrow();

    development();
  });
});
