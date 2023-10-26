import { UpdatedTuple } from '../../../commons/domain/updatedTuple.aggregate';
import { Product } from './product.aggregator';

export class ProductUpdatedTuple extends UpdatedTuple<Product> {}
