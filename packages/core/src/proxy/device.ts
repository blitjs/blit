import * as Types from "../types";
import createShaderModule from "./shaderModule";

export class $LogicalDeviceProxy {
  public readonly $data: ArrayBuffer;
  public readonly $u8: Uint8Array;
  private readonly _client: Types.BlitClient;

  public constructor(client: Types.BlitClient) {
    const buffer = new ArrayBuffer(4),
      u8 = new Uint8Array(buffer),
      id = client.createDevice();
    u8[0] = id;

    this.$data = buffer;
    this.$u8 = u8;
    this._client = client;
  }

  public get $id() {
    return this.$u8[0];
  }

  public createShaderModule() {
    return createShaderModule(this._client);
  }
}

export default function createDevice(client: Types.BlitClient): Types.BlitLogicalDeviceProxy {
  return new $LogicalDeviceProxy(client);
}
