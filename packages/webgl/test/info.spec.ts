import { $ } from "@blit/core";

import info from "../src/info";

const createGL = () => document.createElement("canvas").getContext("webgl");

describe("info", () => {
  it("should populate max color targets", () => {
    expect(info(createGL(), $.logger()).maxColorTargets).not.toBeUndefined();
  });

  it("should populate major and minor version", () => {
    let warning: string;
    const gl = createGL(),
      logger = $.logger({
        handler: (message: string) => {
          warning = message;
        }
      }),
      sets = [
        // Version String, Major, Minor, Warning
        ["1", 1, 0, ""],
        ["2.0", 2, 0, ""],
        ["WebGL1", 1, 0, "minor version"],
        ["WebGL 1", 1, 0, "minor version"],
        ["WebGL 1.", 1, 0, "minor version"],
        ["WebGL 1, 2, 3, 4", 1, 0, "minor version"],
        ["2 a1b2c3", 2, 0, "minor version"],
        ["a2d1.0c.3b", 2, 0, "minor version"],
        ["", 1, 0, "version string"]
      ],
      original = gl.getParameter.bind(gl);

    for (const set of sets) {
      gl.getParameter = (parameter: number) =>
        parameter === WebGLRenderingContext.VERSION
          ? set[0]
          : original(parameter);

      const { majorVersion, minorVersion } = info(gl, logger);
      expect(majorVersion).toBe(set[1] as number);
      expect(minorVersion).toBe(set[2] as number);
      if (set[3]) {
        expect(warning).toContain(set[3] as string);
      }
    }
  });

  it("should ignore warnings on production builds", () => {
    const mode = process.env.NODE_ENV,
      gl = createGL(),
      logger = $.logger(),
      original = gl.getParameter.bind(gl);

    process.env.NODE_ENV = "production";

    for (const version of ["", "1"]) {
      gl.getParameter = (parameter: number) =>
        parameter === WebGLRenderingContext.VERSION
          ? version
          : original(parameter);

      expect(() => info(gl, logger)).not.toThrowError();
    }

    process.env.NODE_ENV = mode;
  });
});
