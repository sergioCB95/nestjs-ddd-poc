import { PrismaService } from '../../commons/infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { ShipmentRepository } from '../domain/shipment.repository';
import { Shipment } from '../domain/aggregators/shipment.aggregator';
import { ShipmentStoredDtoMapper } from './dto/mappers/shipment.stored.dto.mapper';
import { ShipmentStatusStoredDtoMapper } from './dto/mappers/shipmentStatus.stored.dto.mapper';

@Injectable()
export class ShipmentPrismaRepository implements ShipmentRepository {
  private shipmentStoredDtoMapper = new ShipmentStoredDtoMapper();
  private shipmentStatusStoredDtoMapper = new ShipmentStatusStoredDtoMapper();
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Shipment | null> {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: { statuses: true },
    });
    return shipment
      ? this.shipmentStoredDtoMapper.toShipment(shipment, shipment.statuses)
      : null;
  }

  async getAll(): Promise<Shipment[]> {
    const shipments = await this.prisma.shipment.findMany({
      include: { statuses: true },
    });
    return shipments.map((shipment) =>
      this.shipmentStoredDtoMapper.toShipment(shipment, shipment.statuses),
    );
  }

  async save(shipment: Shipment): Promise<Shipment> {
    const newShipmentDto = this.shipmentStoredDtoMapper.fromShipment(shipment);
    const newShipmentStatusesDto = shipment.statuses.map(
      this.shipmentStatusStoredDtoMapper.fromShipmentStatus,
    );
    const newShipment = await this.prisma.shipment.create({
      data: {
        ...newShipmentDto,
        statuses: {
          create: newShipmentStatusesDto,
        },
      },
      include: {
        statuses: true,
      },
    });
    return this.shipmentStoredDtoMapper.toShipment(
      newShipment,
      newShipment.statuses,
    );
  }

  async updateLastStatus(shipment: Shipment): Promise<Shipment> {
    const lastStatus = shipment.statuses[shipment.statuses.length - 1];
    await this.prisma.shipmentStatus.create({
      data: {
        ...lastStatus,
        shipmentId: shipment.id,
      },
    });
    return shipment;
  }
}
