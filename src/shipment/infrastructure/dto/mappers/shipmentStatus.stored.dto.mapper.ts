import { ShipmentStatusStoredDto } from '../shipmentStatus.stored.dto';
import { ShipmentStoredDto } from '../shipment.stored.dto';
import { ShipmentStatus } from '../../../domain/entities/shipmentStatus.entity';

export class ShipmentStatusStoredDtoMapper {
  toShipmentStatus(
    shipmentStatusStoredDto: ShipmentStatusStoredDto,
  ): ShipmentStatus {
    return {
      id: shipmentStatusStoredDto.id,
      type: shipmentStatusStoredDto.type,
      date: shipmentStatusStoredDto.date,
    };
  }

  fromShipmentStatus(shipmentStatus: ShipmentStatus): ShipmentStatusStoredDto {
    return {
      id: shipmentStatus.id,
      type: shipmentStatus.type,
      date: shipmentStatus.date,
    };
  }
}
