import { Injectable } from '@nestjs/common';
import { ShipmentEvents } from '../domain/events/shipment.events';
import { RascalEventPublisher } from '../../commons/application/rascal.event.publisher';
import { RascalClient } from '../../rascal/rascal.client';

@Injectable()
export class ShipmentPublisher extends RascalEventPublisher {
  constructor(protected readonly rascalClient: RascalClient) {
    super(rascalClient);
  }
  eventMap = {
    [ShipmentEvents.StatusUpdated]: {
      publicationId: ShipmentEvents.StatusUpdated,
    },
  };
}

export const ShipmentEventPublisher = Symbol('ShipmentEventPublisher');
