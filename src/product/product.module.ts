import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { ProductPrismaRepository } from './infrastructure/product.prisma.repository';
import { ProductService } from './domain/product.service';
import { ProductRepository } from './domain/product.repository';
import { ProductController } from './application/product.controller';

@Module({
  imports: [CommonsModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductModule {}
