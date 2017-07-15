/* Context */
export type BlitContextInfo = {};

export type BlitContextOptions = { log?: BlitLoggerOptions };

export type BlitContextCapabilities = {
  maxColorTargets: number;
};

export type BlitContext = {
  info: BlitContextInfo;
  capabilities: BlitContextCapabilities;
  getPhysicalDevices(): BlitPhysicalDevice[];
  createDevice(): BlitLogicalDevice;
};

/* Workers */
export type BlitClient = {
  createContext(): BlitId;
  createDevice(): BlitId;
  createShaderModule(): BlitId;
}

/* Proxies */
export type BlitId = number;

// A client object which represents an object on the server
export type BlitProxy = {
  $id: BlitId; // Identifier used to reference the actual object on the server
}

// Objects which have a binary representation and can be transferred between server/client
export type BlitSend = {
  $data: ArrayBuffer;
}

export type BlitContextProxy = BlitProxy & {
  createDevice(): BlitLogicalDeviceProxy;
}

export type BlitLogicalDeviceProxy = BlitProxy & {
  createShaderModule(): BlitShaderModuleProxy;
}

export type BlitShaderModuleProxy = BlitProxy & {
}

/* Physical Device */
export type BlitPhysicalDevice = {
  getQueueFamilies(): BlitQueueFamily[];
  getMemoryTypes(): BlitMemoryType[];
};

/* Queue Family */
export type BlitQueueFamily = {
  queueFlags: number;
};

/* Memory */
export type BlitMemoryType = {
  memoryFlags: number;
};

/* Logical Device */
export type BlitLogicalDevice = {
  createShaderModule(source: string): BlitShaderModule;
  createGraphicsPipelines(pipelineCreateInfo: BlitGraphicsPipelineCreateInfo[]): BlitGraphicsPipeline[];
};

/* Shader Module */
export type BlitShaderModule = {
};

/* Graphics Pipeline */
export type BlitGraphicsPipeline = {
};

export type BlitPipelineShaderStageCreateInfo = {
  name: string;
  module: BlitShaderModule;
}

export type BlitGraphicsPipelineCreateInfo = {
  stages: {[index: number]: BlitPipelineShaderStageCreateInfo}
}

/* Logger */
export type BlitLogHandler = ((message: string, shouldThrow: boolean) => void);

export type BlitLoggerOptions = {
  handler: BlitLogHandler;
};

export type BlitLogFunction = (message: string) => void;

export type BlitLogger = {
  log: BlitLogFunction;
  info: BlitLogFunction;
  warn: BlitLogFunction;
  error: BlitLogFunction;
};
