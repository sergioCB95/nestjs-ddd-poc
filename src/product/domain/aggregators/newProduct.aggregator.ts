import { Product } from './product.aggregator';

export type NewProduct = Omit<Product, 'id'>;
