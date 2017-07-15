import * as Types from "../types";

export class $ShaderModuleProxy {
  public readonly $data: ArrayBuffer;
  public readonly $u8: Uint8Array;

  public constructor(client: Types.BlitClient) {
    const buffer = new ArrayBuffer(4),
      u8 = new Uint8Array(buffer),
      id = client.createShaderModule();
    this.$data = buffer;
    this.$u8 = u8;
    u8[0] = id;
  }

  public get $id() {
    return this.$u8[0];
  }
}

export default function createShaderModule(
  client: Types.BlitClient
): Types.BlitShaderModuleProxy {
  return new $ShaderModuleProxy(client);
}
