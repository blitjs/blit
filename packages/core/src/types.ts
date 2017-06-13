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
  createLogicalDevice(): BlitLogicalDevice;
};

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
export type BlitLogicalDevice = {};

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
