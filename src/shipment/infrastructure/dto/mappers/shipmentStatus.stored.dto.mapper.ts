import { ShipmentStatusStoredDto } from '../shipmentStatus.stored.dto';
import { ShipmentStatus } from '../../../domain/entities/shipmentStatus.entity';
import { ShipmentStatusFactory } from '../../../domain/factories/shipmentStatus.factory';

export class ShipmentStatusStoredDtoMapper {
  toShipmentStatus(
    shipmentStatusStoredDto: ShipmentStatusStoredDto,
  ): ShipmentStatus {
    return new ShipmentStatusFactory().createShipmentStatus({
      id: shipmentStatusStoredDto.id,
      type: shipmentStatusStoredDto.type,
      date: shipmentStatusStoredDto.date,
    });
  }

  fromShipmentStatus(shipmentStatus: ShipmentStatus): ShipmentStatusStoredDto {
    return {
      id: shipmentStatus.id,
      type: shipmentStatus.type,
      date: shipmentStatus.date,
    };
  }
}
