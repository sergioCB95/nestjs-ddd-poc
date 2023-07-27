export const ShipmentStatusType = {
  IN_PROCESS: 'IN_PROCESS',
  READY: 'READY',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
} as const;

export type ShipmentStatusType =
  (typeof ShipmentStatusType)[keyof typeof ShipmentStatusType];
