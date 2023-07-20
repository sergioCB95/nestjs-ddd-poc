import { CreateOrderItemDTO } from '../createOrderItem.dto';
import { NewOrderItem } from '../../../../domain/entities/newOrderItem.entity';

export class CreateOrderItemDTOMapper {
  toNewOrderItem(createOrderItemDTO: CreateOrderItemDTO): NewOrderItem {
    return {
      amount: createOrderItemDTO.amount,
      productId: createOrderItemDTO.productId,
    };
  }
}
