import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDTO {
  @ApiProperty()
  @Type(() => Number)
  amount: number;

  @ApiProperty()
  @Type(() => String)
  productId: string;
}
