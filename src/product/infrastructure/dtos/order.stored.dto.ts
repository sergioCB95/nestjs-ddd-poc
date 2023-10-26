import { Prisma } from '@prisma/client';

export type ProductStoredDto = {
  id: string;
  name: string;
  price: Prisma.Decimal;
  quantity: number;
};
