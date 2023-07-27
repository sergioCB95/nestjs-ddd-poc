import { ShipmentStatusType } from '../../domain/entities/shipmentStatusType.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: ShipmentStatusType;
}
