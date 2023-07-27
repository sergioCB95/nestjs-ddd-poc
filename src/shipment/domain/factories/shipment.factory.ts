import { v4 as uuidv4 } from 'uuid';
import { ShipmentStatusType } from '../entities/shipmentStatusType.entity';
import { Shipment } from '../aggregators/shipment.aggregator';
import { ShipmentStatusFactory } from './shipmentStatus.factory';

type ShipmentInput = Shipment;

export class ShipmentFactory {
  createShipment = ({ id, orderId, statuses }: ShipmentInput): Shipment => ({
    id,
    orderId,
    statuses,
  });

  createNewShipment = (orderId: string): Shipment =>
    this.createShipment({
      id: uuidv4(),
      orderId,
      statuses: [
        new ShipmentStatusFactory().createNewShipmentStatus(
          ShipmentStatusType.IN_PROCESS,
        ),
      ],
    });
}
