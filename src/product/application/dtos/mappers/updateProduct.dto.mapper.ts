import { Product } from '../../../domain/aggregators/product.aggregator';
import { UpdateProductDTO } from '../updateProduct.dto';

export class UpdateProductDTOMapper {
  toProduct({ id, name, price, quantity }: UpdateProductDTO): Product {
    return {
      id,
      name,
      price,
      quantity,
    };
  }
}
