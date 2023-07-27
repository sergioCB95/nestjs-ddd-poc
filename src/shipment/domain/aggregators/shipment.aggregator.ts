import { ShipmentStatus } from '../entities/shipmentStatus.entity';

export class Shipment {
  id: string;
  orderId: string;
  statuses: ShipmentStatus[];
}
