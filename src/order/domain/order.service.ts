import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './order.aggregate';

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

  async save(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async update(order: Order): Promise<Order> {
    return this.orderRepository.update(order);
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
