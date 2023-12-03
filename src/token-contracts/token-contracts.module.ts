import { Module } from '@nestjs/common';
import { TokenContractsService } from './token-contracts.service';

@Module({
  providers: [TokenContractsService],
  exports: [TokenContractsService],
})
export class TokenContractsModule {}
