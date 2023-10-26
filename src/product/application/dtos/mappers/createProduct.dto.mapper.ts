import { NewProduct } from 'src/product/domain/aggregators/newProduct.aggregator';
import { CreateProductDTO } from '../createProduct.dto';

export class CreateProductDTOMapper {
  toNewProduct({ name, price, quantity }: CreateProductDTO): NewProduct {
    return {
      name,
      price,
      quantity,
    };
  }
}
