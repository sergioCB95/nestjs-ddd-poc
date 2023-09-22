import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { BaseRascalService } from './base.rascal.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RascalClient extends ClientProxy {
  constructor(
    protected readonly rascalService: BaseRascalService,
    protected readonly configService: ConfigService,
  ) {
    super();
  }

  async connect(): Promise<any> {
    await this.rascalService.createBroker(this.configService.get('rascal'));
    await this.rascalService.brokerSetUp();
  }
  async close() {}
  async dispatchEvent({ pattern, data }: ReadPacket): Promise<any> {
    await this.rascalService.publish(pattern, data);
  }
  publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    return () => console.log('teardown');
  }
}
