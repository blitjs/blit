export interface BlitColorTarget {}

class ColorTarget implements BlitColorTarget {}

export default function colorTarget(): BlitColorTarget {
  return new ColorTarget();
}
