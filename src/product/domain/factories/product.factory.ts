import { v4 as uuidv4 } from 'uuid';
import { Product } from '../aggregators/product.aggregator';
import { NewProduct } from '../aggregators/newProduct.aggregator';

type ProductInput = Product;

export class ProductFactory {
  createProduct = ({ id, name, price, quantity }: ProductInput): Product => ({
    id,
    name,
    price,
    quantity,
  });

  createNewProduct = ({ name, price, quantity }: NewProduct): Product =>
    this.createProduct({
      id: uuidv4(),
      name,
      price,
      quantity,
    });
}
