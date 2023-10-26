import { Inject, Injectable } from '@nestjs/common';
import { Product } from './aggregators/product.aggregator';
import { NewProduct } from './aggregators/newProduct.aggregator';
import { ProductFactory } from './factories/product.factory';
import { ProductUpdatedTuple } from './aggregators/productUpdatedTuple.aggregate';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}
  async get(id: string): Promise<Product> {
    return this.productRepository.getById(id);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async save(newProduct: NewProduct): Promise<Product> {
    const product = new ProductFactory().createNewProduct(newProduct);
    const storedOrder = await this.productRepository.save(product);
    return storedOrder;
  }

  async update(product: Product): Promise<ProductUpdatedTuple> {
    const productUpdatedTuple = await this.productRepository.update(product);
    return productUpdatedTuple;
  }

  async delete(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }
}
