import { Shipment } from './aggregators/shipment.aggregator';

export interface ShipmentRepository {
  getById(id: string): Promise<Shipment | null>;
  getAll(): Promise<Shipment[]>;
  save(shipment: Shipment): Promise<Shipment>;
  updateLastStatus(shipment: Shipment): Promise<Shipment>;
}

export const ShipmentRepository = Symbol('ShipmentRepository');
