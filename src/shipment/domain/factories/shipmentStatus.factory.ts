import { v4 as uuidv4 } from 'uuid';
import { ShipmentStatusType } from '../entities/shipmentStatusType.entity';
import { ShipmentStatus } from '../entities/shipmentStatus.entity';

type ShipmentStatusInput = ShipmentStatus;

export class ShipmentStatusFactory {
  createShipmentStatus = ({
    id,
    type,
    date,
  }: ShipmentStatusInput): ShipmentStatus => ({
    id,
    type,
    date,
  });

  createNewShipmentStatus = (type: ShipmentStatusType): ShipmentStatus =>
    this.createShipmentStatus({
      id: uuidv4(),
      type,
      date: new Date(),
    });
}
