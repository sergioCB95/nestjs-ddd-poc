import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { BaseRascalService } from './base.rascal.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class RascalClient extends ClientProxy {
  private readonly _logger = new Logger(RascalClient.name);
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
  async close() {
    await this.rascalService.shutdown();
  }
  async dispatchEvent({ pattern, data }: ReadPacket): Promise<any> {
    this._logger.verbose(`Dispatching event {${pattern}}`);
    await this.rascalService.publish(pattern, data);
  }
  publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    return () => console.log('teardown');
  }
}
