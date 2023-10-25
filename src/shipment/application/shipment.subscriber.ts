import { Controller } from '@nestjs/common';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { ShipmentService } from '../domain/shipment.service';
import { OrderUpdatedTuple } from '../../order/domain/aggregators/orderUpdatedTuple.aggregate';
import { OrderStatus } from '../../order/domain/entities/orderStatus.entity';
import { OrderEvents } from '../../order/domain/events/order.events';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ShipmentSubscriber {
  constructor(private readonly shipmentService: ShipmentService) {}

  @AsyncApiSub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: OrderUpdatedTuple,
    },
  })
  @EventPattern(OrderEvents.Updated)
  async orderUpdatedSubscription(@Payload() data: OrderUpdatedTuple) {
    if (data.new.status === OrderStatus.PAID) {
      await this.shipmentService.create(data.new.id);
    }
  }
}
