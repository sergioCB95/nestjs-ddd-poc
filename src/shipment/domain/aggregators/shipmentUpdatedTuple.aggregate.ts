import { UpdatedTuple } from '../../../commons/domain/updatedTuple.aggregate';
import { Shipment } from './shipment.aggregator';

export class ShipmentUpdatedTuple extends UpdatedTuple<Shipment> {}
