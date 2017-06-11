import * as Types from "./types";
import { GL_MAX_COLOR_ATTACHMENTS } from "./common";
import { isSupported } from "./info";

export default function capabilities(
  gl: Types.$WebGLContext,
  info: Types.BlitWebGLContextInfo
) {
  const drawBuffersSupported = isSupported(info, 2, 0, "WEBGL_draw_buffers");
  return {
    context: {
      maxColorTargets: drawBuffersSupported
        ? gl.getParameter(GL_MAX_COLOR_ATTACHMENTS)
        : 1
    },
    gl: {
      instancedArraysSupported: isSupported(
        info,
        2,
        0,
        "ANGLE_instanced_arrays"
      ),
      drawBuffersSupported
    }
  };
}
