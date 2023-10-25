import { Inject, Injectable } from '@nestjs/common';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentStatusType } from './entities/shipmentStatusType.entity';
import { Shipment } from './aggregators/shipment.aggregator';
import { ShipmentFactory } from './factories/shipment.factory';
import { ShipmentStatusFactory } from './factories/shipmentStatus.factory';
import { ShipmentUpdatedTuple } from './aggregators/shipmentUpdatedTuple.aggregate';
import { UpdatedTupleFactory } from '../../commons/domain/updatedTuple.factory';
import {
  ShipmentEventPublisher,
  ShipmentPublisher,
} from '../application/shipment.publisher';
import { ShipmentStatusUpdatedEvent } from './events/shipment.events';

@Injectable()
export class ShipmentService {
  constructor(
    @Inject(ShipmentRepository)
    private readonly shipmentRepository: ShipmentRepository,
    @Inject(ShipmentEventPublisher)
    private readonly shipmentPublisher: ShipmentPublisher,
  ) {}
  async getAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.getAll();
  }
  async get(id: string): Promise<Shipment | null> {
    return await this.shipmentRepository.getById(id);
  }
  async create(orderId: string): Promise<Shipment> {
    return await this.shipmentRepository.save(
      new ShipmentFactory().createNewShipment(orderId),
    );
  }
  async updateStatus(
    id: string,
    status: ShipmentStatusType,
  ): Promise<ShipmentUpdatedTuple | null> {
    const shipment = await this.get(id);
    if (!shipment) {
      return null;
    }
    const shipmentUpdated = new ShipmentFactory().createShipment({
      id: shipment.id,
      orderId: shipment.orderId,
      statuses: [
        ...shipment.statuses,
        new ShipmentStatusFactory().createNewShipmentStatus(status),
      ],
    });
    await this.shipmentRepository.updateLastStatus(shipmentUpdated);
    const updatedShipment = new UpdatedTupleFactory<Shipment>().build(
      shipment,
      shipmentUpdated,
    );
    await this.shipmentPublisher.publish(
      new ShipmentStatusUpdatedEvent(updatedShipment),
    );
  }
}
