import { Order } from './order.aggregate';

export interface OrderRepository {
  getById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: String): Promise<void>;
}

export const OrderRepository = Symbol('OrderRepository');
