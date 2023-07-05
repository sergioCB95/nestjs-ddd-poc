import { UpdateOrderItemDTOMapper } from './updateOrderItem.dto.mapper';
import { UpdateOrderDTO } from '../updateOrder.dto';
import { CreateOrderItemDTOMapper } from './createOrderItem.dto.mapper';
import { isCreateOrderItemDTO } from '../../utils/isCreateOrderItemDTO';
import { UpdateOrder } from '../../../domain/aggregators/updateOrder.aggregate';

export class UpdateOrderDTOMapper {
  toUpdateOrder(updateOrderDTO: UpdateOrderDTO): UpdateOrder {
    const updateOrderItemDTOMapper = new UpdateOrderItemDTOMapper();
    const createOrderItemDTOMapper = new CreateOrderItemDTOMapper();
    return {
      id: updateOrderDTO.id,
      items: updateOrderDTO.items.map((item) =>
        isCreateOrderItemDTO(item)
          ? createOrderItemDTOMapper.toNewOrderItem(item)
          : updateOrderItemDTOMapper.toOrderItem(item),
      ),
    };
  }
}
