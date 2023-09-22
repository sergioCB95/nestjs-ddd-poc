import { EventPublisher } from '../domain/event.publisher';
import { RascalClient } from '../../rascal/rascal.client';
import { firstValueFrom } from 'rxjs';

export class RascalEventPublisher extends EventPublisher {
  constructor(protected readonly rascalClient: RascalClient) {
    super();
  }

  protected async publishEvent(eventName: string, data: any): Promise<void> {
    await firstValueFrom(this.rascalClient.emit(eventName, data));
  }
}
