import { OrderStatus } from '../../domain/entities/orderStatus.entity';

export interface OrderDAO {
  id: string;
  status: OrderStatus;
}
