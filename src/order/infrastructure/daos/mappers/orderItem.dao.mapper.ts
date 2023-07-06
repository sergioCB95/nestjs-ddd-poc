import { OrderItemDAO } from '../orderItem.dao';
import { OrderItem } from '../../../domain/entities/orderItem.entity';
import { OrderItemFactory } from '../../../domain/factories/orderItem.factory';

export class OrderItemDAOMapper {
  toOrderItem(orderItemDAO: OrderItemDAO): OrderItem {
    return new OrderItemFactory().createOrderItem({
      id: orderItemDAO.id,
      amount: orderItemDAO.amount,
      productId: orderItemDAO.productId,
    });
  }

  fromOrderItem(orderItem: OrderItem): OrderItemDAO {
    return {
      id: orderItem.id,
      amount: orderItem.amount,
      productId: orderItem.productId,
    };
  }
}
