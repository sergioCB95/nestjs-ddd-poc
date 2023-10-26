import { Product } from 'src/product/domain/aggregators/product.aggregator';
import { ProductStoredDto } from '../order.stored.dto';
import { ProductFactory } from 'src/product/domain/factories/product.factory';
import { Prisma } from '@prisma/client';

export class ProductStoredDtoMapper {
  toProduct({ id, name, price, quantity }: ProductStoredDto): Product {
    return new ProductFactory().createProduct({
      id,
      name,
      price: price.toNumber(),
      quantity,
    });
  }

  fromProduct({ id, name, price, quantity }: Product): ProductStoredDto {
    return {
      id,
      name,
      price: new Prisma.Decimal(price),
      quantity,
    };
  }
}
