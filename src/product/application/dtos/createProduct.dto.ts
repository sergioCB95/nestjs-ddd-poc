import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @ApiProperty()
  @Type(() => String)
  name: string;

  @ApiProperty()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @Type(() => Number)
  quantity: number;
}
