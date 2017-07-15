import * as Types from "../types";
import createDevice from "./device";

export class $ContextProxy {
  public readonly $id: Types.BlitId;
  private readonly _client: Types.BlitClient;

  public constructor(client: Types.BlitClient) {
    this.$id = client.createContext();
    this._client = client;
  }

  public createDevice() {
    return createDevice(this._client);
  }
}

export default function createContext(client: Types.BlitClient): Types.BlitContextProxy {
  return new $ContextProxy(client);
}
