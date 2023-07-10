import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdateOrder } from './aggregators/updateOrder.aggregate';
import { OrderFactory } from './factories/order.factory';
import { EventObserver } from '../../commons/domain/event.observer';
import { OrderEventFactory } from './events/order.event.factory';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
    private readonly eventObserver: EventObserver,
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
    this.eventObserver.publish(
      new OrderEventFactory().buildOrderCreatedEvent(storedOrder),
    );
    return storedOrder;
  }

  async update(updatedOrder: UpdateOrder): Promise<Order> {
    const order = new OrderFactory().createUpdatedOrder(updatedOrder);
    return this.orderRepository.update(order);
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
