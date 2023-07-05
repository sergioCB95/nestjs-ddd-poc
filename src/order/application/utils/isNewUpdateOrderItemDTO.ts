import { UpdateOrderItemDTO } from '../dtos/updateOrderItem.dto';

export const isNewUpdateOrderItemDTO = (
  orderItem: UpdateOrderItemDTO,
): boolean => (orderItem as UpdateOrderItemDTO).id === undefined;
