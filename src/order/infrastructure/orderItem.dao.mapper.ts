import { OrderItem } from '../domain/orderItem.entity';
import { OrderItemDAO } from './orderItem.dao';

export class OrderItemDAOMapper {
  toOrderItem(orderItemDAO: OrderItemDAO): OrderItem {
    return {
      id: orderItemDAO.id,
      amount: orderItemDAO.amount,
      productId: orderItemDAO.productId,
    };
  }

  fromOrderItem(orderItem: OrderItem): OrderItemDAO {
    return {
      id: orderItem.id,
      amount: orderItem.amount,
      productId: orderItem.productId,
    };
  }
}
