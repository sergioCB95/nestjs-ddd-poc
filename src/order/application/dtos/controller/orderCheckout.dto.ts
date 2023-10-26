import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCheckoutDTO {
  @ApiProperty()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Type(() => String)
  address: string;
}
