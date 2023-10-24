import { Injectable } from '@nestjs/common';
import { RascalClient } from '../../rascal/rascal.client';

@Injectable()
export class CustomRascalClient extends RascalClient {
  protected onPublicationError(err: any, messageId: string): void {
    this.logger.error('Publisher error', err, messageId);
  }
}
