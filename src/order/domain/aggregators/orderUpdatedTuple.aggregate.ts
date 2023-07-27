import { UpdatedTuple } from '../../../commons/domain/updatedTuple.aggregate';
import { Order } from './order.aggregate';

export class OrderUpdatedTuple extends UpdatedTuple<Order> {}
