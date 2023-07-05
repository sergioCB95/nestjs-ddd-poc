import { UpdateOrderItemDTO } from './updateOrderItem.dto';
import { CreateOrderItemDTO } from './createOrderItem.dto';

export interface UpdateOrderDTO {
  id: string;
  items: Array<UpdateOrderItemDTO | CreateOrderItemDTO>;
}
