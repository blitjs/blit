const process = { env: { NODE_ENV: "development" } },
  { core: { QueueFlag, ShaderStage }, webgl } = blit,
  canvas = document.createElement("canvas"),
  context = webgl.createContext(),
  physicalDevice = context.getPhysicalDevices()[0],
  device = context.createLogicalDevice(physicalDevice, [
    {
      queueFamily: physicalDevice
        .getQueueFamilies()
        .find(
          family =>
            family.queueFlags & QueueFlag.GRAPHICS &&
            family.queueFlags & QueueFlag.PRESENT
        ),
      queuePriorities: [1.0]
    }
  ]),
  vertexShaderModule = device.createShaderModule(ShaderStage.VERTEX, `#version 300 es
    precision mediump float;
    out vec4 color;
    const vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));
    void main() {
      color = vec4(pos[gl_VertexID], 0.5, 1.0);
    }
  `),
  fragmentShaderModule = device.createShaderModule(ShaderStage.FRAGMENT, `#version 300 es
    precision mediump float;
    layout(location = 0) out vec4 fragColor;
    void main() {
      fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `);
