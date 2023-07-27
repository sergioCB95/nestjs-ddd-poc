import { AmqpEventSubscriber } from '../../commons/application/amqp.event.subscriber';
import { Injectable } from '@nestjs/common';
import { AsyncApi, AsyncApiSub } from 'nestjs-asyncapi';
import { ShipmentService } from '../domain/shipment.service';
import { OrderUpdatedTuple } from '../../order/domain/aggregators/orderUpdatedTuple.aggregate';
import { OrderStatus } from '../../order/domain/entities/orderStatus.entity';
import { OrderEvents } from '../../order/domain/events/order.events';

@Injectable()
@AsyncApi()
export class ShipmentSubscriber {
  constructor(
    private readonly amqpEventSubscriber: AmqpEventSubscriber,
    private readonly shipmentService: ShipmentService,
  ) {}

  @AsyncApiSub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: OrderUpdatedTuple,
    },
  })
  async orderUpdatedSubscription() {}

  async onModuleInit() {
    await this.amqpEventSubscriber.subscribe<OrderUpdatedTuple>(
      OrderEvents.Updated,
      async (data) => {
        if (data.old.status === OrderStatus.PAID) {
          await this.shipmentService.create(data.old.id);
        }
      },
    );
  }
}
