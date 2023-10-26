import { PrismaService } from '../../commons/infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdatedTupleFactory } from '../../commons/domain/updatedTuple.factory';
import { ProductRepository } from '../domain/product.repository';
import { Product } from '../domain/aggregators/product.aggregator';
import { ProductStoredDtoMapper } from './dtos/mappers/product.stored.dto.mapper';
import { ProductUpdatedTuple } from '../domain/aggregators/productUpdatedTuple.aggregate';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  mapper = new ProductStoredDtoMapper();
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? this.mapper.toProduct(product) : null;
  }

  async getAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => this.mapper.toProduct(product));
  }

  async save(product: Product): Promise<Product> {
    const newProductDTO = this.mapper.fromProduct(product);
    const newProduct = await this.prisma.product.create({
      data: newProductDTO,
    });
    return this.mapper.toProduct(newProduct);
  }

  async update(product: Product): Promise<ProductUpdatedTuple> {
    const storedProduct = await this.getById(product.id);
    const productDTO = this.mapper.fromProduct(product);
    const productUpdated = await this.prisma.product.update({
      where: { id: product.id },
      data: productDTO,
    });

    return new UpdatedTupleFactory<Product>().build(
      this.mapper.toProduct(productUpdated),
      storedProduct,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
