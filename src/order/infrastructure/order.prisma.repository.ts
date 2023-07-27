import { PrismaService } from '../../commons/infrastructure/prisma.service';
import { OrderRepository } from '../domain/order.repository';
import { Order } from '../domain/aggregators/order.aggregate';
import { Injectable } from '@nestjs/common';
import { OrderStoredDtoMapper } from './dtos/mappers/order.stored.dto.mapper';
import { OrderItemStoredDtoMapper } from './dtos/mappers/orderItem.stored.dto.mapper';
import { OrderUpdatedTuple } from '../domain/aggregators/orderUpdatedTuple.aggregate';
import { UpdatedTupleFactory } from '../../commons/domain/updatedTuple.factory';

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
    const newOrderDao = this.orderStoredDtoMapper.fromOrder(order);
    const newOrderItemsDao = order.items.map(
      this.orderItemStoredDtoMapper.fromOrderItem,
    );
    const newOrder = await this.prisma.order.create({
      data: {
        ...newOrderDao,
        items: {
          create: newOrderItemsDao,
        },
      },
      include: {
        items: true,
      },
    });
    return this.orderStoredDtoMapper.toOrder(newOrder, newOrder.items);
  }

  async update(order: Order): Promise<OrderUpdatedTuple> {
    const storedOrder = await this.getById(order.id);

    const itemsToCreate = order.items.filter(
      (item) => !storedOrder.items.includes(item),
    );
    const itemsToUpdate = storedOrder.items.filter((item) =>
      order.items.includes(item),
    );
    const itemsToDelete = storedOrder.items.filter(
      (item) => !order.items.includes(item),
    );

    const orderDAO = this.orderStoredDtoMapper.fromOrder(order);

    const orderUpdate = this.prisma.order.update({
      where: { id: order.id },
      data: {
        ...orderDAO,
        items: {
          deleteMany: itemsToDelete.map((item) => ({ id: item.id })),
          createMany: {
            data: itemsToCreate.map(
              this.orderItemStoredDtoMapper.fromOrderItem,
            ),
          },
        },
      },
      include: {
        items: true,
      },
    });
    const orderItemUpdates = itemsToUpdate.map((item) =>
      this.prisma.orderItem.update({
        where: { id: item.id },
        data: this.orderItemStoredDtoMapper.fromOrderItem(item),
      }),
    );

    await this.prisma.$transaction([orderUpdate, ...orderItemUpdates]);
    const orderUpdated = await this.getById(order.id);

    return new UpdatedTupleFactory<Order>().build(storedOrder, orderUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
