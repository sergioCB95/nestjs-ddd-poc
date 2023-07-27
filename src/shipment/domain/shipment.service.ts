import { Inject, Injectable } from '@nestjs/common';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentStatusType } from './entities/shipmentStatusType.entity';
import { Shipment } from './aggregators/shipment.aggregator';
import { ShipmentFactory } from './factories/shipment.factory';
import { ShipmentStatusFactory } from './factories/shipmentStatus.factory';

@Injectable()
export class shipmentService {
  constructor(
    @Inject(ShipmentRepository)
    private readonly shipmentRepository: ShipmentRepository,
  ) {}
  async getAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.getAll();
  }
  async getById(id: string): Promise<Shipment | null> {
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
  ): Promise<Shipment | null> {
    const shipment = await this.getById(id);
    if (!shipment) {
      return null;
    }
    shipment.statuses.push(
      new ShipmentStatusFactory().createNewShipmentStatus(status),
    );
    await this.shipmentRepository.updateLastStatus(shipment);
    return shipment;
  }
}
