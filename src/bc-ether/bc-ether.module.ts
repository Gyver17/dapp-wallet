import { Module } from '@nestjs/common';
import { EthersModule, SEPOLIA_NETWORK } from 'nestjs-ethers';
import { BcEtherService } from './bc-ether.service';

@Module({
  imports: [
    EthersModule.forRoot({
      // network: SEPOLIA_NETWORK,
      custom: 'http://127.0.0.1:7545',
      useDefaultProvider: false,
    }),
  ],
  providers: [BcEtherService],
  exports: [BcEtherService],
})
export class BcEtherModule {}
