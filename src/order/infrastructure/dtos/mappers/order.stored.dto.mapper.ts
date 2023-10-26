import { OrderItemStoredDtoMapper } from './orderItem.stored.dto.mapper';
import { OrderStoredDto } from '../order.stored.dto';
import { OrderItemStoredDto } from '../orderItem.stored.dto';
import { Order } from '../../../domain/aggregators/order.aggregate';
import { OrderFactory } from '../../../domain/factories/order.factory';

export class OrderStoredDtoMapper {
  toOrder(
    orderDTO: OrderStoredDto,
    orderItemsDTO: OrderItemStoredDto[] = [],
  ): Order {
    const orderItemStoredDtoMapper = new OrderItemStoredDtoMapper();
    return new OrderFactory().createOrder({
      id: orderDTO.id,
      status: orderDTO.status,
      address: orderDTO.address,
      items: orderItemsDTO.map((item) =>
        orderItemStoredDtoMapper.toOrderItem(item),
      ),
    });
  }

  fromOrder(order: Order): OrderStoredDto {
    return {
      id: order.id,
      status: order.status,
      address: order.address,
    };
  }
}
