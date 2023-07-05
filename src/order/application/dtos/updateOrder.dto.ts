import { UpdateOrderItemDTO } from './updateOrderItem.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDTO {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @ApiProperty({ type: [UpdateOrderItemDTO] })
  items: Array<UpdateOrderItemDTO>;
}
