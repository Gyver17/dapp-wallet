import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BcEtherModule } from 'src/bc-ether/bc-ether.module';
import { TokenContractsModule } from 'src/token-contracts/token-contracts.module';

@Module({
  imports: [BcEtherModule, TokenContractsModule],
  controllers: [BalancesController],
})
export class BalancesModule {}
