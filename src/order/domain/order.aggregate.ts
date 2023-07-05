import { OrderItem } from './orderItem.entity';

export interface Order {
  id: string;
  items: OrderItem[];
}
