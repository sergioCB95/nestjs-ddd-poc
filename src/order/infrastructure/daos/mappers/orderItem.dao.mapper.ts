import { OrderItemDAO } from '../orderItem.dao';
import { OrderItem } from '../../../domain/entities/orderItem.entity';
import { NewOrderItem } from '../../../domain/entities/newOrderItem.entity';
import { NewOrderItemDAO } from '../newOrderItem.dao';

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

  fromNewOrderItem(orderItem: NewOrderItem): NewOrderItemDAO {
    return {
      amount: orderItem.amount,
      productId: orderItem.productId,
    };
  }
}
