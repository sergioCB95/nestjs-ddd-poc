import { OrderStatus } from '../entities/orderStatus.entity';

export interface BaseOrder<T> {
  id: string;
  status: OrderStatus;
  items: Array<T>;
}
