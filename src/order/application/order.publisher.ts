import { Injectable } from '@nestjs/common';
import { OrderEvents } from '../domain/events/order.events';
import { RascalEventPublisher } from '../../commons/application/rascal.event.publisher';
import { RascalClient } from '../../commons/infrastructure/rascal.client';

@Injectable()
export class OrderPublisher extends RascalEventPublisher {
  constructor(protected readonly rascalClient: RascalClient) {
    super(rascalClient);
  }
  eventMap = {
    [OrderEvents.Created]: {
      publicationId: OrderEvents.Created,
    },
    [OrderEvents.Updated]: {
      publicationId: OrderEvents.Updated,
    },
  };
}

export const OrderEventPublisher = Symbol('OrderEventPublisher');
