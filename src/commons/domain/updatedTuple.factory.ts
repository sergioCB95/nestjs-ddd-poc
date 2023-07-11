import { UpdatedTuple } from './updatedTuple.aggregate';

export class UpdatedTupleFactory<T> {
  build(newData: T, oldData: T): UpdatedTuple<T> {
    return {
      new: newData,
      old: oldData,
    };
  }
}
