import { ShipmentStatusStoredDto } from '../shipmentStatus.stored.dto';
import { ShipmentStoredDto } from '../shipment.stored.dto';
import { ShipmentStatusStoredDtoMapper } from './shipmentStatus.stored.dto.mapper';
import { Shipment } from '../../../domain/aggregators/shipment.aggregator';

export class ShipmentStoredDtoMapper {
  toShipment(
    shipmentStoredDto: ShipmentStoredDto,
    shipmentStatusesStoredDto: ShipmentStatusStoredDto[],
  ): Shipment {
    return {
      id: shipmentStoredDto.id,
      orderId: shipmentStoredDto.orderId,
      statuses: shipmentStatusesStoredDto.map((shipmentStatusStoredDto) =>
        new ShipmentStatusStoredDtoMapper().toShipmentStatus(
          shipmentStatusStoredDto,
        ),
      ),
    };
  }

  fromShipment(shipment: Shipment) {
    return {
      id: shipment.id,
      orderId: shipment.orderId,
    };
  }
}
