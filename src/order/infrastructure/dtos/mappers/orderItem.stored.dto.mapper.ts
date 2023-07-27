import { OrderItemStoredDao } from '../orderItem.stored.dao';
import { OrderItem } from '../../../domain/entities/orderItem.entity';
import { OrderItemFactory } from '../../../domain/factories/orderItem.factory';

export class OrderItemStoredDtoMapper {
  toOrderItem(orderItemDAO: OrderItemStoredDao): OrderItem {
    return new OrderItemFactory().createOrderItem({
      id: orderItemDAO.id,
      amount: orderItemDAO.amount,
      productId: orderItemDAO.productId,
    });
  }

  fromOrderItem(orderItem: OrderItem): OrderItemStoredDao {
    return {
      id: orderItem.id,
      amount: orderItem.amount,
      productId: orderItem.productId,
    };
  }
}
