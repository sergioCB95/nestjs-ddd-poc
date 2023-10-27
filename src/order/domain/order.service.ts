import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './aggregators/order.aggregate';
import { OrderFactory } from './factories/order.factory';
import { OrderUpdatedTuple } from './aggregators/orderUpdatedTuple.aggregate';
import { EventPublisher } from '../../commons/domain/event.publisher';
import { OrderEventPublisher } from '../application/order.publisher';
import { OrderCreatedEvent, OrderUpdatedEvent } from './events/order.events';
import { OrderStatus } from './entities/orderStatus.entity';
import { NewOrderItem } from './entities/newOrderItem.entity';
import { OrderItemFactory } from './factories/orderItem.factory';
import { OrderItem } from './entities/orderItem.entity';
import { UpdatedTupleFactory } from 'src/commons/domain/updatedTuple.factory';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
    @Inject(OrderEventPublisher)
    private readonly orderPublisher: EventPublisher,
  ) {}
  async get(id: string): Promise<Order> {
    return this.orderRepository.getById(id);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async create(): Promise<Order> {
    const order = new OrderFactory().createNewOrder();
    const storedOrder = await this.orderRepository.save(order);
    await this.orderPublisher.publish(new OrderCreatedEvent(storedOrder));
    return storedOrder;
  }

  private async buildOrderUpdatedTupleAndPublish(
    newOrder: Order,
    oldOrder: Order,
  ): Promise<OrderUpdatedTuple> {
    const orderUpdatedTuple = new UpdatedTupleFactory<Order>().build(
      newOrder,
      oldOrder,
    );
    await this.orderPublisher.publish(new OrderUpdatedEvent(orderUpdatedTuple));
    return orderUpdatedTuple;
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    const originalOrder = new OrderFactory().createOrder(order);
    order.status = status;
    const orderUpdated = await this.orderRepository.update(order);
    return await this.buildOrderUpdatedTupleAndPublish(
      orderUpdated,
      originalOrder,
    );
  }

  async checkout(id: string, address: string): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    const originalOrder = new OrderFactory().createOrder(order);
    order.address = address;
    order.status = OrderStatus.PAID;
    const orderUpdated = await this.orderRepository.update(order);
    return await this.buildOrderUpdatedTupleAndPublish(
      orderUpdated,
      originalOrder,
    );
  }

  async delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  async addItem(
    id: string,
    newOrderItem: NewOrderItem,
  ): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    const orderItem = new OrderItemFactory().createNewOrderItem(newOrderItem);
    const orderUpdated = await this.orderRepository.saveItem(id, orderItem);
    return await this.buildOrderUpdatedTupleAndPublish(orderUpdated, order);
  }

  async updateItem(
    id: string,
    orderItem: OrderItem,
  ): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    const orderUpdated = await this.orderRepository.updateItem(id, orderItem);
    return await this.buildOrderUpdatedTupleAndPublish(orderUpdated, order);
  }

  async deleteItem(id: string, itemId: string): Promise<OrderUpdatedTuple> {
    const order = await this.get(id);
    const orderUpdated = await this.orderRepository.deleteItem(id, itemId);
    return await this.buildOrderUpdatedTupleAndPublish(orderUpdated, order);
  }
}
