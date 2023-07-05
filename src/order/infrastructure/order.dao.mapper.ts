import { Order } from '../domain/order.aggregate';
import { OrderItemDAOMapper } from './orderItem.dao.mapper';
import { OrderDAO } from './order.dao';
import { OrderItemDAO } from './orderItem.dao';

export class OrderDAOMapper {
  toOrder(orderDAO: OrderDAO, orderItemsDAO: OrderItemDAO[] = []): Order {
    const orderItemSchemaMapper = new OrderItemDAOMapper();
    return {
      id: orderDAO.id,
      items: orderItemsDAO.map((item) =>
        orderItemSchemaMapper.toOrderItem(item),
      ),
    };
  }

  fromOrder(order: Order): OrderDAO {
    return {
      id: order.id,
    };
  }
}
