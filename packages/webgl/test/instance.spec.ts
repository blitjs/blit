import { $ } from "@blit/core";

import instance from "../src/instance";
import info from "../src/info";

const createGL = () => document.createElement("canvas").getContext("webgl");

describe("instance", () => {
  it("should create an instance", () => {
    expect(instance()).not.toBeUndefined();
  });

  it("should accept a log handler", () => {
    const hello = "hello";
    let logged: string;
    instance({
      log: {
        handler: (message: string) => { logged = message; }
      }
    }).$logger.info(hello);
    expect(logged).toContain(hello);
  });
});
