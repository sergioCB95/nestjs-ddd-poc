import { Injectable } from '@nestjs/common';
import { BaseRascalService } from '../../rascal/base.rascal.service';

@Injectable()
export class RascalService extends BaseRascalService {
  async brokerSetUp() {
    this.broker.on('error', console.error);
  }
}
