import { UpdateOrderItemEventDto } from './updateOrderItemEvent.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/orderStatus.entity';

export class UpdateOrderEventDto {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Type(() => String)
  status: OrderStatus;

  @ApiProperty({ type: [UpdateOrderItemEventDto] })
  items: Array<UpdateOrderItemEventDto>;
}
