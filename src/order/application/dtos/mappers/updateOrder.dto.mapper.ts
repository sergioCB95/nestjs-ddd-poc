import { UpdateOrderItemDTOMapper } from './updateOrderItem.dto.mapper';
import { UpdateOrderDTO } from '../updateOrder.dto';
import { CreateOrderItemDTOMapper } from './createOrderItem.dto.mapper';
import { isNewUpdateOrderItemDTO } from '../../utils/isNewUpdateOrderItemDTO';
import { UpdateOrder } from '../../../domain/aggregators/updateOrder.aggregate';

export class UpdateOrderDTOMapper {
  toUpdateOrder(updateOrderDTO: UpdateOrderDTO): UpdateOrder {
    const updateOrderItemDTOMapper = new UpdateOrderItemDTOMapper();
    return {
      id: updateOrderDTO.id,
      items: updateOrderDTO.items.map((item) =>
        isNewUpdateOrderItemDTO(item)
          ? updateOrderItemDTOMapper.toNewOrderItem(item)
          : updateOrderItemDTOMapper.toOrderItem(item),
      ),
    };
  }
}
