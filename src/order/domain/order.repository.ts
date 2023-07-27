import { Order } from './aggregators/order.aggregate';
import { NewOrder } from './aggregators/newOrder.aggregate';
import { UpdatedOrder } from './aggregators/updatedOrder.aggregate';
import { OrderUpdatedTuple } from './aggregators/orderUpdatedTuple.aggregate';

export interface OrderRepository {
  getById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  save(order: NewOrder): Promise<Order>;
  update(order: UpdatedOrder): Promise<OrderUpdatedTuple>;
  delete(id: String): Promise<void>;
}

export const OrderRepository = Symbol('OrderRepository');
