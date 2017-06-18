export interface BlitTargetSet {}

class TargetSet implements BlitTargetSet {}

export default function targetSet(): BlitTargetSet {
  return new TargetSet();
}
