import { NewOrderItem } from '../../../domain/entities/newOrderItem.entity';
import { OrderItem } from '../../../domain/entities/orderItem.entity';
import { UpdateOrderItemDTO } from '../updateOrderItem.dto';

export class UpdateOrderItemDTOMapper {
  toOrderItem(updateOrderItemDTO: UpdateOrderItemDTO): OrderItem {
    return {
      id: updateOrderItemDTO.id,
      amount: updateOrderItemDTO.amount,
      productId: updateOrderItemDTO.productId,
    };
  }
}
