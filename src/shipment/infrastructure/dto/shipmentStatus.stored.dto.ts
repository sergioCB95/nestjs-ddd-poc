import { ShipmentStatusType } from '../../domain/entities/shipmentStatusType.entity';

export class ShipmentStatusStoredDto {
  id: string;
  type: ShipmentStatusType;
  date: Date;
}
