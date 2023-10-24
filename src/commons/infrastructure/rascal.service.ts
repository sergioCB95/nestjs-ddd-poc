import { Injectable } from '@nestjs/common';
import { RascalService } from '../../rascal/rascal.service';

@Injectable()
export class CustomRascalService extends RascalService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async brokerSetUp() {}

  async onConnectionError(err: any) {
    this.logger.error('Rascal connection error', err);
  }
}
