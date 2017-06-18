export interface BlitDepthStencilTarget {}

class DepthStencilTarget implements BlitDepthStencilTarget {}

export default function depthStencilTarget(): BlitDepthStencilTarget {
  return new DepthStencilTarget();
}
