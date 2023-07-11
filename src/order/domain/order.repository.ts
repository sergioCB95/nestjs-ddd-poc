import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdateOrder } from './aggregators/updateOrder.aggregate';
import { OrderUpdatedTuple } from './aggregators/orderUpdatedTuple.aggregate';

export interface OrderRepository {
  getById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  save(order: NewOrder): Promise<Order>;
  update(order: UpdateOrder): Promise<OrderUpdatedTuple>;
  delete(id: String): Promise<void>;
}

export const OrderRepository = Symbol('OrderRepository');
