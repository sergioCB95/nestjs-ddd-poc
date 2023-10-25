import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdatedOrder } from './aggregators/updatedOrder.aggregate';
import { OrderFactory } from './factories/order.factory';
import { OrderUpdatedTuple } from './aggregators/orderUpdatedTuple.aggregate';
import { EventPublisher } from '../../commons/domain/event.publisher';
import { OrderEventPublisher } from '../application/order.publisher';
import { OrderCreatedEvent, OrderUpdatedEvent } from './events/order.events';
import { OrderStatus } from './entities/orderStatus.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
    @Inject(OrderEventPublisher)
    private readonly orderPublisher: EventPublisher,
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
    await this.orderPublisher.publish(new OrderCreatedEvent(storedOrder));
    return storedOrder;
  }

  async update(updatedOrder: UpdatedOrder): Promise<OrderUpdatedTuple> {
    const order = new OrderFactory().createUpdatedOrder(updatedOrder);
    const orderUpdatedTuple = await this.orderRepository.update(order);
    await this.orderPublisher.publish(new OrderUpdatedEvent(orderUpdatedTuple));
    return orderUpdatedTuple;
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    order.status = status;
    const orderUpdatedTuple = await this.update(order);
    return orderUpdatedTuple;
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
