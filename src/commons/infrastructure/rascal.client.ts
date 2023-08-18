import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { AmqpService } from './amqp.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RascalClient extends ClientProxy {
  constructor(protected readonly amqpService: AmqpService) {
    super();
  }

  async connect(): Promise<any> {
    await this.amqpService.createBroker();
  }
  async close() {}
  async dispatchEvent({ pattern, data }: ReadPacket): Promise<any> {
    await this.amqpService.publish(pattern, data);
  }
  publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    return () => console.log('teardown');
  }
}
