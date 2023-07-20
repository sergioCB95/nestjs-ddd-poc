import { CreateOrderItemDTO } from './createOrderItem.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({ type: [CreateOrderItemDTO] })
  items: CreateOrderItemDTO[];
}
