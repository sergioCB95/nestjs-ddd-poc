import { PrismaService } from '../../commons/infrastructure/prisma.service';
import { OrderRepository } from '../domain/order.repository';
import { Order } from '../domain/aggregators/order.aggregate';
import { Injectable } from '@nestjs/common';
import { OrderDAOMapper } from './daos/mappers/order.dao.mapper';
import { OrderItemDAOMapper } from './daos/mappers/orderItem.dao.mapper';

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? new OrderDAOMapper().toOrder(order, order.items) : null;
  }
  async getAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: { items: true },
    });
    const mapper = new OrderDAOMapper();
    return orders.map((order) => mapper.toOrder(order, order.items));
  }
  async save(order: Order): Promise<Order> {
    const daoMapper = new OrderDAOMapper();
    const itemsMapper = new OrderItemDAOMapper();
    const newOrderDao = daoMapper.fromOrder(order);
    const newOrderItemsDao = order.items.map(itemsMapper.fromOrderItem);
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
    return daoMapper.toOrder(newOrder, newOrder.items);
  }
  async update(order: Order): Promise<Order> {
    const daoMapper = new OrderDAOMapper();
    const itemDAOMapper = new OrderItemDAOMapper();
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

    const orderDAO = daoMapper.fromOrder(order);

    const orderUpdate = this.prisma.order.update({
      where: { id: order.id },
      data: {
        ...orderDAO,
        items: {
          deleteMany: itemsToDelete.map((item) => ({ id: item.id })),
          createMany: {
            data: itemsToCreate.map(itemDAOMapper.fromOrderItem),
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
        data: itemDAOMapper.fromOrderItem(item),
      }),
    );

    await this.prisma.$transaction([orderUpdate, ...orderItemUpdates]);

    return this.getById(order.id);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
