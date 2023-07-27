import { UpdateOrderItemDTOMapper } from './updateOrderItem.dto.mapper';
import { UpdateOrderDTO } from '../updateOrder.dto';
import { isNewUpdateOrderItemDTO } from '../../../utils/isNewUpdateOrderItemDTO';
import { UpdatedOrder } from '../../../../domain/aggregators/updatedOrder.aggregate';

export class UpdateOrderDTOMapper {
  toUpdateOrder(updateOrderDTO: UpdateOrderDTO): UpdatedOrder {
    const updateOrderItemDTOMapper = new UpdateOrderItemDTOMapper();
    return {
      id: updateOrderDTO.id,
      status: updateOrderDTO.status,
      items: updateOrderDTO.items.map((item) =>
        isNewUpdateOrderItemDTO(item)
          ? updateOrderItemDTOMapper.toNewOrderItem(item)
          : updateOrderItemDTOMapper.toOrderItem(item),
      ),
    };
  }
}
