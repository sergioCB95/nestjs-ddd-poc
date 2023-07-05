import { BaseOrder } from './baseOrder.aggregate';
import { NewOrderItem } from '../entities/newOrderItem.entity';
import { OrderItem } from '../entities/orderItem.entity';

export type UpdateOrder = BaseOrder<OrderItem | NewOrderItem>;
