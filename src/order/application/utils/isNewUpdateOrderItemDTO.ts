import { UpdateOrderItemDTO } from '../dtos/controller/updateOrderItem.dto';

export const isNewUpdateOrderItemDTO = (
  orderItem: UpdateOrderItemDTO,
): boolean => (orderItem as UpdateOrderItemDTO).id === undefined;
