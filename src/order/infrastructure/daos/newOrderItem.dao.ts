import { OrderItemDAO } from './orderItem.dao';

export type NewOrderItemDAO = Omit<OrderItemDAO, 'id'>;
