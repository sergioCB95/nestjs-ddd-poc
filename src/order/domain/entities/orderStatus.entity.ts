export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
