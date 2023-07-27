import { ShipmentStatusType } from './shipmentStatusType.entity';

export class ShipmentStatus {
  id: string;
  type: ShipmentStatusType;
  date: Date;
}
