import { CreateOrderItemDTO } from '../dtos/createOrderItem.dto';
import { UpdateOrderItemDTO } from '../dtos/updateOrderItem.dto';

export const isCreateOrderItemDTO = (
  orderItem: CreateOrderItemDTO | UpdateOrderItemDTO,
): orderItem is CreateOrderItemDTO =>
  (orderItem as UpdateOrderItemDTO).id === undefined;
