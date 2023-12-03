import { Module } from '@nestjs/common';
import { EthersModule, SEPOLIA_NETWORK } from 'nestjs-ethers';
import { BcEtherService } from './bc-ether.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EthersModule.forRoot({
      network: SEPOLIA_NETWORK,
      // custom: 'http://127.0.0.1:7545',
      // useDefaultProvider: false,
    }),
    // EthersModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     // network: SEPOLIA_NETWORK,
    //     alchemy: config.get<string>('ALCHEMY_API_KEY'),
    //     useDefaultProvider: false,
    //   }),
    // }),
  ],
  providers: [BcEtherService],
  exports: [BcEtherService],
})
export class BcEtherModule {}
