export default () => {
  return {
    rascal: {
      vhosts: {
        '/': {
          connection: {
            url: process.env.AMQP_URL ?? '',
          },
          exchanges: {
            'order.created': {
              type: 'fanout',
              options: {
                durable: false,
              },
            },
            'order.updated': {
              type: 'fanout',
              options: {
                durable: false,
              },
            },
            'shipment.status_updated': {
              type: 'fanout',
              options: {
                durable: false,
              },
            },
          },
          queues: [
            'nestjs-ddd-poc-queue_order.created',
            'nestjs-ddd-poc-queue_order.updated',
            'nestjs-ddd-poc-queue_shipment.status_updated',
          ],
          bindings: {
            'order.created_nestjs-ddd-poc-queue_order.created': {
              source: 'order.created',
              destination: 'nestjs-ddd-poc-queue_order.created',
            },
            'order.updated_nestjs-ddd-poc-queue_order.updated': {
              source: 'order.updated',
              destination: 'nestjs-ddd-poc-queue_order.updated',
            },
            'shipment.status_updated_nestjs-ddd-poc-queue_shipment.status_updated':
              {
                source: 'shipment.status_updated',
                destination: 'nestjs-ddd-poc-queue_shipment.status_updated',
              },
          },
        },
      },
      publications: {
        order_created: {
          vhost: '/',
          exchange: 'order.created',
        },
        order_updated: {
          vhost: '/',
          exchange: 'order.updated',
        },
        shipment_status_updated: {
          vhost: '/',
          exchange: 'shipment.status_updated',
        },
      },
      subscriptions: {
        order_updated: {
          vhost: '/',
          queue: 'nestjs-ddd-poc-queue_order.updated',
          contentType: 'application/json',
        },
        shipment_status_updated: {
          vhost: '/',
          queue: 'nestjs-ddd-poc-queue_shipment.status_updated',
          contentType: 'application/json',
        },
      },
    },
  };
};
