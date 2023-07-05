import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdateOrder } from './aggregators/updateOrder.aggregate';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
  ) {}
  async get(id: string): Promise<Order> {
    return this.orderRepository.getById(id);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async save(order: NewOrder): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async update(order: UpdateOrder): Promise<Order> {
    return this.orderRepository.update(order);
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
