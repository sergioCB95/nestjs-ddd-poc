import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/orderStatus.entity';

export class UpdateOrderStatusDTO {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Type(() => String)
  status: OrderStatus;
}
