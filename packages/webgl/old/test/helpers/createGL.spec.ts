export function createGL(version: number = 2, attachToBody: boolean = false) {
  const canvas = document.createElement("canvas"),
    context = canvas.getContext(
      version === 1 ? "webgl" : "webgl2"
    ) as WebGL2RenderingContext;
  return {
    context,
    destroy() {
      // Flush any oustanding commands
      context.flush();
      // Attempt to lose context
      const extension =
        context.getExtension("WEBGL_lose_context") ||
        context.getExtension("WEBKIT_WEBGL_lose_context") ||
        context.getExtension("MOZ_WEBGL_lose_context");
      if (extension) {
        extension.loseContext();
      }
      if (attachToBody) {
        document.body.removeChild(canvas);
      }
    }
  };
}
