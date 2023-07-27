import { UpdatedTuple } from '../../../commons/domain/updatedTuple.aggregate';
import { Shipment } from './shipment.aggregator';

export type ShipmentUpdatedTuple = UpdatedTuple<Shipment>;
