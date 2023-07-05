import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateOrderItemDTO {
  @ApiProperty()
  @Type(() => String)
  id?: string;

  @ApiProperty()
  @Type(() => Number)
  amount: number;

  @ApiProperty()
  @Type(() => String)
  productId: string;
}
