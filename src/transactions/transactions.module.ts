import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BcEtherModule } from 'src/bc-ether/bc-ether.module';
import { TokenContractsModule } from 'src/token-contracts/token-contracts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [BcEtherModule, TokenContractsModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
