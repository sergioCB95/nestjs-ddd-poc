import { PrismaService } from '../../commons/infrastructure/prisma.service';
import { OrderRepository } from '../domain/order.repository';
import { Order } from '../domain/aggregators/order.aggregate';
import { Injectable } from '@nestjs/common';
import { OrderStoredDtoMapper } from './dtos/mappers/order.stored.dto.mapper';
import { OrderItemStoredDtoMapper } from './dtos/mappers/orderItem.stored.dto.mapper';
import { OrderItem } from '../domain/entities/orderItem.entity';

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  orderStoredDtoMapper = new OrderStoredDtoMapper();
  orderItemStoredDtoMapper = new OrderItemStoredDtoMapper();

  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order
      ? new OrderStoredDtoMapper().toOrder(order, order.items)
      : null;
  }

  async getAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: { items: true },
    });
    const mapper = new OrderStoredDtoMapper();
    return orders.map((order) => mapper.toOrder(order, order.items));
  }

  async save(order: Order): Promise<Order> {
    const newOrderDTO = this.orderStoredDtoMapper.fromOrder(order);
    await this.prisma.order.create({
      data: newOrderDTO,
    });
    const orderWithItems = await this.getById(order.id);
    return orderWithItems;
  }

  async update(order: Order): Promise<Order> {
    const orderDTO = this.orderStoredDtoMapper.fromOrder(order);
    await this.prisma.order.update({
      where: { id: order.id },
      data: orderDTO,
    });
    const orderWithItems = await this.getById(order.id);
    return orderWithItems;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }

  async saveItem(id: string, orderItem: OrderItem): Promise<Order> {
    await this.prisma.orderItem.create({
      data: {
        ...orderItem,
        orderId: id,
      },
    });
    const order = await this.getById(id);
    return order;
  }
  async updateItem(id: string, orderItem: OrderItem): Promise<Order> {
    await this.prisma.orderItem.update({
      where: { id: orderItem.id },
      data: { ...orderItem, id },
    });
    const order = await this.getById(id);
    return order;
  }
  async deleteItem(id: string, itemId: string): Promise<Order> {
    await this.prisma.orderItem.delete({
      where: { id: itemId },
    });
    const order = await this.getById(id);
    return order;
  }
}
