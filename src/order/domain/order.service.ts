import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdateOrder } from './aggregators/updateOrder.aggregate';
import { OrderFactory } from './factories/order.factory';
import { EventBus } from '../../commons/domain/event.bus';
import {
  OrderCreatedEventFactory,
  OrderUpdatedEventFactory,
} from './events/order.event.factory';
import { OrderUpdatedTuple } from './aggregators/orderUpdatedTuple.aggregate';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}
  async get(id: string): Promise<Order> {
    return this.orderRepository.getById(id);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async save(newOrder: NewOrder): Promise<Order> {
    const order = new OrderFactory().createNewOrder(newOrder);
    const storedOrder = await this.orderRepository.save(order);
    this.eventBus.publish(new OrderCreatedEventFactory().build(storedOrder));
    return storedOrder;
  }

  async update(updatedOrder: UpdateOrder): Promise<OrderUpdatedTuple> {
    const order = new OrderFactory().createUpdatedOrder(updatedOrder);
    const orderUpdatedTuple = await this.orderRepository.update(order);
    this.eventBus.publish(
      new OrderUpdatedEventFactory().build(orderUpdatedTuple),
    );
    return orderUpdatedTuple;
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
