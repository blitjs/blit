import { BlitClient, BlitLogger } from "@blit/core";

import * as Types from "./types";
import { MAX_CONTEXTS_PER_CLIENT } from "./common";

export default function createClient(
  options: Types.$WebGLClientOptions,
  logger: BlitLogger
): BlitClient {
  const { messageHandler } = options,
    activeContextIds: number[] = [];
  const { contextIdOffset } = options;
  return {
    createContext() {
      messageHandler.send();
      let newId: number | undefined;
      for (
        let i = contextIdOffset;
        i < MAX_CONTEXTS_PER_CLIENT + contextIdOffset;
        i++
      ) {
        if (activeContextIds.indexOf(i) === -1) {
          newId = i;
          activeContextIds.push(i);
          break;
        }
      }
      if (process.env.NODE_ENV !== "production") {
        if (newId === undefined) {
          logger.error("cannot create context");
        }
      }
      return newId!;
    },
    createDevice() {
      return 1;
    },
    createShaderModule() {
      return 2;
    }
  };
}
