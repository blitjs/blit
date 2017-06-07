import { BlitInfo } from "@blit/core";
import { WebGLContext } from "./context";
export interface BlitWebGLInfo extends BlitInfo {
    majorVersion: number;
    minorVersion: number;
}
export default function info(context: WebGLContext): BlitWebGLInfo;
