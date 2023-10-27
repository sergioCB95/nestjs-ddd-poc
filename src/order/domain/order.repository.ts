import { Order } from './aggregators/order.aggregate';
import { OrderItem } from './entities/orderItem.entity';

export interface OrderRepository {
  getById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  saveItem(id: string, orderItem: OrderItem): Promise<Order>;
  updateItem(id: string, orderItem: OrderItem): Promise<Order>;
  deleteItem(id: string, itemId: string): Promise<Order>;
}

export const OrderRepository = Symbol('OrderRepository');
