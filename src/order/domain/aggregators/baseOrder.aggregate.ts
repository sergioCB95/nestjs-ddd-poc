import { OrderStatus } from '../entities/orderStatus.entity';

export interface BaseOrder<T> {
  id: string;
  status: OrderStatus;
  address: string | null;
  items: Array<T>;
}
