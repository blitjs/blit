import { BlitPhysicalDevice } from "@blit/core";

export default function physicalDevice(): BlitPhysicalDevice {
  return {
    getQueueFamilies() {
      return [];
    }
  };
}
