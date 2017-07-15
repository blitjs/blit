import createPhysicalDevice from "../src/physicalDevice";

describe("physical device", () => {
  it("should create a physical device", () => {
    expect(createPhysicalDevice()).toBeDefined();
  });

  it("should get queue families", () => {
    const families = createPhysicalDevice().getQueueFamilies();
    expect(families).toBeDefined();
    expect(families.length).toBeGreaterThanOrEqual(0);
  });

  it("should get memory types", () => {
    const types = createPhysicalDevice().getMemoryTypes();
    expect(types).toBeDefined();
    expect(types.length).toBeGreaterThanOrEqual(0);
  });
});
