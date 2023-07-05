import { CreateOrderDTO } from '../createOrder.dto';
import { CreateOrderItemDTOMapper } from './createOrderItem.dto.mapper';
import { NewOrder } from '../../../domain/aggregators/newOrder.aggregate';

export class CreateOrderDTOMapper {
  toNewOrder(createOrderDTO: CreateOrderDTO): NewOrder {
    const createOrderItemDTOMapper = new CreateOrderItemDTOMapper();
    return {
      items: createOrderDTO.items.map((item) =>
        createOrderItemDTOMapper.toNewOrderItem(item),
      ),
    };
  }
}
