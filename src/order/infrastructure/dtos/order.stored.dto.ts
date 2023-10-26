import { OrderStatus } from '../../domain/entities/orderStatus.entity';

export interface OrderStoredDto {
  id: string;
  status: OrderStatus;
  address: string | null;
}
