import { UpdateOrderItemDTO } from './updateOrderItem.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../domain/entities/orderStatus.entity';

export class UpdateOrderDTO {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @Type(() => String)
  status: OrderStatus;

  @ApiProperty({ type: [UpdateOrderItemDTO] })
  items: Array<UpdateOrderItemDTO>;
}
