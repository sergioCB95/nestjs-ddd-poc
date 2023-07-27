import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Shipment } from '../domain/aggregators/shipment.aggregator';
import { ShipmentService } from '../domain/shipment.service';
import { ShipmentUpdatedTuple } from '../domain/aggregators/shipmentUpdatedTuple.aggregate';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get(':id')
  get(@Param('id') id: string): Promise<Shipment> {
    return this.shipmentService.get(id);
  }

  @Get()
  getAll(): Promise<Shipment[]> {
    return this.shipmentService.getAll();
  }

  @Put()
  updateStatus(
    @Body() { id, status }: UpdateStatusDto,
  ): Promise<ShipmentUpdatedTuple> {
    return this.shipmentService.updateStatus(id, status);
  }
}
