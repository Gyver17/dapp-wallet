import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BcEtherModule } from './bc-ether/bc-ether.module';
import { BalancesModule } from './balances/balances.module';
import { TokenContractsModule } from './token-contracts/token-contracts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BcEtherModule,
    BalancesModule,
    TokenContractsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
