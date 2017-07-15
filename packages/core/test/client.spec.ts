import createContext from "../src/proxy/context";

describe("client", () => {
  it("should return ids whenever creating objects on the server", () => {
    const mockClient = {
      createContext() {
        return undefined as any;
      },
      createDevice() {
        return undefined as any;
      },
      createShaderModule() {
        return undefined as any;
      }
    };

    const contextId = 10,
      context = createContext({
        ...mockClient,
        createContext: () => contextId
      });
    expect(context.$id).toBe(contextId);

    const deviceId = 20,
      device = createContext({
        ...mockClient,
        createDevice: () => deviceId
      }).createDevice();
    expect(device.$id).toBe(deviceId);

    const shaderModuleId = 30,
      shaderModule = createContext({
        ...mockClient,
        createShaderModule: () => shaderModuleId
      })
        .createDevice()
        .createShaderModule();
    expect(shaderModule.$id).toBe(shaderModuleId);
  });
});
