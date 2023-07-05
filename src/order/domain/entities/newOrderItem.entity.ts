import { OrderItem } from './orderItem.entity';

export type NewOrderItem = Omit<OrderItem, 'id'>;
