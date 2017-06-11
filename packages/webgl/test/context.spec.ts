import createContext from "../src/context";

describe("context", () => {
  it("should create an context", () => {
    expect(createContext()).toBeDefined();
  });

  it("should accept a log handler", () => {
    const hello = "hello";
    let logged: string | undefined;
    createContext({
      log: {
        handler: (message: string) => {
          logged = message;
        }
      }
    }).$logger.info(hello);
    expect(logged).toContain(hello);
  });

  it("should get physical devices", () => {
    const devices = createContext().getPhysicalDevices();
    expect(devices.length).toBeGreaterThanOrEqual(1);
  });

  it("should create a logical device", () => {
    const device = createContext().createLogicalDevice();
    expect(device).toBeDefined();
  })
});
