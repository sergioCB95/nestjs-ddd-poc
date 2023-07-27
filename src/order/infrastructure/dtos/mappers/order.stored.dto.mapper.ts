import { OrderItemStoredDtoMapper } from './orderItem.stored.dto.mapper';
import { OrderStoredDto } from '../order.stored.dto';
import { OrderItemStoredDto } from '../orderItem.stored.dto';
import { Order } from '../../../domain/aggregators/order.aggregate';
import { OrderFactory } from '../../../domain/factories/order.factory';

export class OrderStoredDtoMapper {
  toOrder(
    orderDAO: OrderStoredDto,
    orderItemsDAO: OrderItemStoredDto[] = [],
  ): Order {
    const orderItemStoredDtoMapper = new OrderItemStoredDtoMapper();
    return new OrderFactory().createOrder({
      id: orderDAO.id,
      status: orderDAO.status,
      items: orderItemsDAO.map((item) =>
        orderItemStoredDtoMapper.toOrderItem(item),
      ),
    });
  }

  fromOrder(order: Order): OrderStoredDto {
    return {
      id: order.id,
      status: order.status,
    };
  }
}
