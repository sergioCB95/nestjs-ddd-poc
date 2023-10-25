import { Event } from '../../../commons/domain/event';
import { ShipmentUpdatedTuple } from '../aggregators/shipmentUpdatedTuple.aggregate';

export const ShipmentEvents = {
  StatusUpdated: 'shipment_status_updated',
};

export class ShipmentStatusUpdatedEvent extends Event<ShipmentUpdatedTuple> {
  constructor(data: ShipmentUpdatedTuple) {
    super(ShipmentEvents.StatusUpdated, data);
  }
}
