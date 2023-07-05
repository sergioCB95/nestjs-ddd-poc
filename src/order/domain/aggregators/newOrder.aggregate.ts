import { BaseOrder } from './baseOrder.aggregate';
import { NewOrderItem } from '../entities/newOrderItem.entity';

export type NewOrder = Omit<BaseOrder<NewOrderItem>, 'id'>;
