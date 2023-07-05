import { OrderItemDAOMapper } from './orderItem.dao.mapper';
import { OrderDAO } from '../order.dao';
import { OrderItemDAO } from '../orderItem.dao';
import { Order } from '../../../domain/aggregators/order.aggregate';
import { UpdateOrder } from '../../../domain/aggregators/updateOrder.aggregate';
import { NewOrder } from '../../../domain/aggregators/newOrder.aggregate';
import { NewOrderDAO } from '../newOrder.dao';

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

  fromUpdateOrder(order: UpdateOrder): OrderDAO {
    return {
      id: order.id,
    };
  }

  fromNewOrder(order: NewOrder): NewOrderDAO {
    return {};
  }
}
