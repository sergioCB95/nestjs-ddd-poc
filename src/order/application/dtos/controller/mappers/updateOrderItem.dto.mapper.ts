import { OrderItem } from '../../../../domain/entities/orderItem.entity';
import { UpdateOrderItemDTO } from '../updateOrderItem.dto';
import { NewOrderItem } from '../../../../domain/entities/newOrderItem.entity';

export class UpdateOrderItemDTOMapper {
  toOrderItem(updateOrderItemDTO: UpdateOrderItemDTO): OrderItem {
    return {
      id: updateOrderItemDTO.id,
      amount: updateOrderItemDTO.amount,
      productId: updateOrderItemDTO.productId,
    };
  }

  toNewOrderItem(updateOrderItemDTO: UpdateOrderItemDTO): NewOrderItem {
    return {
      amount: updateOrderItemDTO.amount,
      productId: updateOrderItemDTO.productId,
    };
  }
}
