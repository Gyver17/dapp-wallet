import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectEthersProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import { ethers, AlchemyProvider } from 'ethers';
import * as ERC20 from './abi/ERC20.json';
import { ConfigService } from '@nestjs/config';
import { TokenContract } from '@prisma/client';
import { BlockchainTransaction } from './bc-ether.type';

@Injectable()
export class BcEtherService {
  constructor(
    @InjectEthersProvider()
    private readonly customProvider: AlchemyProvider,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    private readonly configService: ConfigService,
  ) {}

  async getBlockNumber(): Promise<number> {
    return await this.customProvider.getBlockNumber();
  }

  async generateRandomWallet() {
    const wallet = this.ethersSigner.createRandomWallet();

    const privateKey = wallet.privateKey;
    const walletAddress = await wallet.getAddress();

    return { privateKey, walletAddress };
  }

  async getBalance(address: string) {
    const balance = await this.customProvider.getBalance(address);

    return ethers.formatEther(balance.toString());
  }

  async getTokenBalance(token: TokenContract, address: string) {
    const contractInstance = this.ethersContract.create(
      token.address,
      ERC20.abi,
    );

    const balance = await contractInstance.balanceOf(address);

    return ethers.formatEther(balance.toString());
  }

  async getContract(token: TokenContract) {
    const contractInstance = this.ethersContract.create(
      token.address,
      ERC20.abi,
    );

    return contractInstance;
  }

  async transferToken(
    token: TokenContract,
    fromPrivateKey: string,
    toAddress: string,
    amount: number,
  ) {
    const wallet = this.ethersSigner.createWallet(fromPrivateKey);

    const contractInstance = this.ethersContract.create(
      token.address,
      ERC20.abi,
      wallet,
    );

    const parsedAmount = ethers.parseEther(amount.toString());

    const balance = await contractInstance.balanceOf(wallet.address);
    if (balance.lt(parsedAmount)) {
      throw new BadRequestException('Insufficient funds');
    }

    return contractInstance.transfer(
      toAddress,
      parsedAmount,
    ) as Promise<BlockchainTransaction>;
  }

  async transferEther(
    fromPrivateKey: string,
    toAddress: string,
    amount: number,
  ) {
    const fromWallet = this.ethersSigner.createWallet(fromPrivateKey);
    const parsedAmount = ethers.parseEther(amount.toString());

    const balance = await fromWallet.getBalance();
    if (balance.lt(parsedAmount)) {
      throw new BadRequestException('Insufficient funds');
    }

    return fromWallet.sendTransaction({
      to: toAddress,
      value: parsedAmount,
    });
  }
}
