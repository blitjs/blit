import { BlitPhysicalDevice, QueueFlag } from "@blit/core";

export default function physicalDevice(): BlitPhysicalDevice {
  return {
    getQueueFamilies() {
      return [
        {
          queueFlags: QueueFlag.GRAPHICS | QueueFlag.PRESENT
        }
      ];
    },
    getMemoryTypes() {
      return [];
    }
  };
}
