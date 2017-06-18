const { core: { QueueFlag } } = blit,
  canvas = document.createElement("canvas"),
  context = blit.webgl.createContext(),
  physicalDevice = context.getPhysicalDevices()[0],
  { device, queues: [queue] } = context.createLogicalDevice(physicalDevice, [
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
  /*swapchain = device.createSwapchain(canvas, {
    minimumImageCount: 2
  });*/
  vertexShaderModule = device.createShaderModule(`#version 300 es
    layout(location = 0)
    out vec4 vColor;
    void main() {
        switch(gl_VertexIndex) {
            case 0: gl_Position = vec4(-0.5, -0.5, 0.0, 1.0); break;
            case 1: gl_Position = vec4(+0.5, -0.5, 0.0, 1.0); break;
            case 2: gl_Position = vec4(+0.0, +0.7, 0.0, 1.0); break;
        }
        vColor = gl_Position * 0.5 + 0.5;
    }
  `),
  fragmentShaderModule = device.createShaderModule(`#version 300 es
    layout(location = 0)
    in vec4 vColor;
    layout(location = 0)
    out vec4 oColor;
    void main() {
        oColor = vColor;
    }
  `);
