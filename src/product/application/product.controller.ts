import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '../domain/aggregators/product.aggregator';
import { ProductService } from '../domain/product.service';
import { ProductUpdatedTuple } from '../domain/aggregators/productUpdatedTuple.aggregate';
import { CreateProductDTOMapper } from './dtos/mappers/createProduct.dto.mapper';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { UpdateProductDTOMapper } from './dtos/mappers/updateProduct.dto.mapper';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  get(@Param('id') id: string): Promise<Product> {
    return this.productService.get(id);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  @Post()
  save(@Body() product: CreateProductDTO): Promise<Product> {
    return this.productService.save(
      new CreateProductDTOMapper().toNewProduct(product),
    );
  }

  @Put()
  update(@Body() product: UpdateProductDTO): Promise<ProductUpdatedTuple> {
    return this.productService.update(
      new UpdateProductDTOMapper().toProduct(product),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
