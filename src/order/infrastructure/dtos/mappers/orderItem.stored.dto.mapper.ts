import { OrderItemStoredDto } from '../orderItem.stored.dto';
import { OrderItem } from '../../../domain/entities/orderItem.entity';
import { OrderItemFactory } from '../../../domain/factories/orderItem.factory';

export class OrderItemStoredDtoMapper {
  toOrderItem(orderItemDAO: OrderItemStoredDto): OrderItem {
    return new OrderItemFactory().createOrderItem({
      id: orderItemDAO.id,
      amount: orderItemDAO.amount,
      productId: orderItemDAO.productId,
    });
  }

  fromOrderItem(orderItem: OrderItem): OrderItemStoredDto {
    return {
      id: orderItem.id,
      amount: orderItem.amount,
      productId: orderItem.productId,
    };
  }
}
