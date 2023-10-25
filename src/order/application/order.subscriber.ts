import { Controller } from '@nestjs/common';
import { AsyncApiSub } from 'nestjs-asyncapi';
import { OrderService } from '../domain/order.service';
import { ShipmentUpdatedTuple } from '../../shipment/domain/aggregators/shipmentUpdatedTuple.aggregate';
import { OrderEvents } from '../domain/events/order.events';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ShipmentStatusType } from '@prisma/client';
import { OrderStatus } from '../domain/entities/orderStatus.entity';

@Controller()
export class OrderSubscriber {
  constructor(private readonly orderService: OrderService) {}

  @AsyncApiSub({
    channel: 'nestjs-ddd-poc.v1.shipment.status_updated',
    message: {
      payload: ShipmentUpdatedTuple,
    },
  })
  @EventPattern(OrderEvents.Updated)
  async ShipmentStatusUpdatedSubscription(
    @Payload() data: ShipmentUpdatedTuple,
  ) {
    if (
      data.new.statuses[data.new.statuses.length - 1].type ===
      ShipmentStatusType.READY
    ) {
      await this.orderService.updateStatus(data.new.id, OrderStatus.SHIPPED);
    }
  }
}
