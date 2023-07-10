import { OrderItemDAOMapper } from './orderItem.dao.mapper';
import { OrderDAO } from '../order.dao';
import { OrderItemDAO } from '../orderItem.dao';
import { Order } from '../../../domain/aggregators/order.aggregate';
import { OrderFactory } from '../../../domain/factories/order.factory';

export class OrderDAOMapper {
  toOrder(orderDAO: OrderDAO, orderItemsDAO: OrderItemDAO[] = []): Order {
    const orderItemSchemaMapper = new OrderItemDAOMapper();
    return new OrderFactory().createOrder({
      id: orderDAO.id,
      status: orderDAO.status,
      items: orderItemsDAO.map((item) =>
        orderItemSchemaMapper.toOrderItem(item),
      ),
    });
  }

  fromOrder(order: Order): OrderDAO {
    return {
      id: order.id,
      status: order.status,
    };
  }
}
