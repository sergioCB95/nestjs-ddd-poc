import { OrderDAO } from './order.dao';

export type NewOrderDAO = Omit<OrderDAO, 'id'>;
