import { UpdatedTuple } from '../../../commons/domain/updatedTuple.aggregate';
import { Order } from './order.aggregate';

export type OrderUpdatedTuple = UpdatedTuple<Order>;
