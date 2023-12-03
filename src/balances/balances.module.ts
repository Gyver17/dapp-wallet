import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BcEtherModule } from 'src/bc-ether/bc-ether.module';

@Module({
  imports: [BcEtherModule],
  controllers: [BalancesController],
})
export class BalancesModule {}
