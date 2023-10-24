import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { RascalService } from './rascal.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export type RascalClientOptions = {
  onPublicationError?: (err: any, messageId: string) => void;
  configKey?: string;
};

const defaultOnPublicationError =
  (logger) =>
  async (err: any, messageId: string): Promise<void> => {
    logger.error('Publisher error', err, messageId);
  };

export class RascalClient extends ClientProxy {
  private onPublicationError: (err: any, messageId: string) => void;
  private configKey: string;
  protected readonly logger = new Logger(RascalClient.name);
  constructor(
    protected readonly rascalService: RascalService,
    protected readonly configService: ConfigService,
    { onPublicationError, configKey }: RascalClientOptions = {},
  ) {
    super();
    this.onPublicationError =
      onPublicationError ?? defaultOnPublicationError(this.logger);
    this.configKey = configKey ?? 'rascal';
  }

  async connect(): Promise<any> {
    const broker = await this.rascalService.connect(
      this.configService.get(this.configKey),
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
