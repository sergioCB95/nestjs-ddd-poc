import { EventPublisher } from '../domain/event.publisher';
import { AmqpService } from '../infrastructure/amqp.service';

export abstract class AmqpEventPublisher extends EventPublisher {
  protected constructor(protected readonly amqpService: AmqpService) {
    super();
  }

  async publishEvent(eventName: string, data: any): Promise<void> {
    await this.amqpService.publish(eventName, data);
  }
}
