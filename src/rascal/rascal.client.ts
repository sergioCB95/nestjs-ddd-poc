import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { RascalService } from './rascal.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export abstract class RascalClient extends ClientProxy {
  protected readonly logger = new Logger(RascalClient.name);
  constructor(
    protected readonly rascalService: RascalService,
    protected readonly configService: ConfigService,
  ) {
    super();
  }

  protected abstract onPublicationError(err: any, messageId: string): void;

  async connect(): Promise<any> {
    const broker = await this.rascalService.connect(
      this.configService.get('rascal'),
    );
    return broker;
  }

  async close() {
    await this.rascalService.shutdown();
  }

  private async publishEvent({ pattern, data }: ReadPacket): Promise<any> {
    try {
      const publication = await this.rascalService.publish(pattern, data);
      publication.on('error', this.onPublicationError);
      return publication;
    } catch (err) {
      throw new Error(`Rascal config error: ${err.message}`);
    }
  }

  async dispatchEvent({ pattern, data }: ReadPacket): Promise<any> {
    this.logger.verbose(`Dispatching event {${pattern}}`);
    return await this.publishEvent({ pattern, data });
  }

  publish(
    { pattern, data }: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    this.logger.verbose(`Dispatching event {${pattern}}`);
    this.publishEvent({ pattern, data })
      .then(callback)
      .catch((err) => callback({ err }));
    return () => undefined;
  }
}
