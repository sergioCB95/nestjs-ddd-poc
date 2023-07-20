import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemEventDTO {
  @ApiProperty()
  @Type(() => Number)
  amount: number;

  @ApiProperty()
  @Type(() => String)
  productId: string;
}
