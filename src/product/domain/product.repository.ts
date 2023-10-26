import { NewProduct } from './aggregators/newProduct.aggregator';
import { Product } from './aggregators/product.aggregator';
import { ProductUpdatedTuple } from './aggregators/productUpdatedTuple.aggregate';

export interface ProductRepository {
  getById(id: string): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  save(product: NewProduct): Promise<Product>;
  update(product: Product): Promise<ProductUpdatedTuple>;
  delete(id: string): Promise<void>;
}

export const ProductRepository = Symbol('ProductRepository');
