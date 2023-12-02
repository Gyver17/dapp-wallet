import { Injectable } from '@nestjs/common';
import {
  EthersSigner,
  InjectEthersProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import { EtherscanProvider, ethers } from 'ethers';

@Injectable()
export class BcEtherService {
  constructor(
    @InjectEthersProvider()
    private readonly customProvider: EtherscanProvider,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
  ) {}

  async getBlockNumber(): Promise<number> {
    return await this.customProvider.getBlockNumber();
  }

  async generateRandomWallet() {
    const wallet = this.ethersSigner.createRandomWallet();

    const privateKey = wallet.privateKey
    const walletAddress = await wallet.getAddress();

    return { privateKey, walletAddress };
  }

  async getBalance(address: string) {
    const balance = await this.customProvider.getBalance(address);

    return balance;
  }
}
