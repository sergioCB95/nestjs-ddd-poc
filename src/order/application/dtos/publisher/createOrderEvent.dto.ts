import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateOrderItemEventDTO } from './createOrderItemEvent.dto';
import { OrderStatus } from '../../../domain/entities/orderStatus.entity';

export class CreateOrderEventDTO {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Type(() => String)
  status: OrderStatus;

  @ApiProperty({ type: [CreateOrderItemEventDTO] })
  items: CreateOrderItemEventDTO[];
}
