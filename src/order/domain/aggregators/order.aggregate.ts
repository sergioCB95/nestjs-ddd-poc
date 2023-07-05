import { OrderItem } from '../entities/orderItem.entity';
import { BaseOrder } from './baseOrder.aggregate';

export type Order = BaseOrder<OrderItem>;
