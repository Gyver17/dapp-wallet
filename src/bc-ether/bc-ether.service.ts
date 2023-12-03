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
import { ERC20Contract } from './bc-ether.types';
import { ConfigService } from '@nestjs/config';
import { TokenContract } from '@prisma/client';

@Injectable()
export class BcEtherService {
  private readonly mainWalletAddress: string;

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

  async getContract(contract: TokenContract) {
    const contractInstance = this.ethersContract.create(
      contract.address,
      ERC20.abi,
    );

    return contractInstance;
  }

  async getTokenBalance(contract: TokenContract, address: string) {
    const contractInstance = await this.getContract(contract);

    const balance = await contractInstance.balanceOf(address);

    return balance;
  }

  async transferToken(address: string, amount: number, privateKey: string) {
    // const contractInstance = await this.getERC20Contract(type);
    // const signer: any = await this.customProvider.ge;
    const wallet = this.ethersSigner.createWallet(privateKey);

    const contractInstance = this.ethersContract.create(
      '0x36160274B0ED3673E67F2CA5923560a7a0c523aa',
      ERC20.abi,
      wallet,
    );

    const parsedAmount = ethers.parseEther(amount.toString());

    const balance = await contractInstance.balanceOf(wallet.address);
    if (balance.lt(parsedAmount)) {
      throw new BadRequestException('Insufficient funds');
    }

    return contractInstance.transfer(address, parsedAmount);

    // return tx;
  }

  async transfer(address: string, amount: number, privateKey: string) {
    const fromWallet = this.ethersSigner.createWallet(privateKey);
    const signer = await this.customProvider.getSigner(fromWallet.address);
    const parsedAmount = ethers.parseEther(amount.toString());

    const nerwork = await this.customProvider.getNetwork();
    const chainId = nerwork.chainId;
    console.log('chainId', chainId);

    return signer.sendTransaction({
      to: address,
      value: parsedAmount,
    });
  }

  async transferFromMainWallet(address: string, amount: number) {
    // const mainWallet = await this.getMainWallet();
    // const signer = await this.customProvider.getSigner(mainWallet.address);
    // const parsedAmount = ethers.parseEther(amount.toString());
    // const balance = await mainWallet.getBalance();
    // if (balance.lt(parsedAmount)) {
    //   throw new BadRequestException('Insufficient funds');
    // }
    // const tx = await signer.sendTransaction({
    //   to: address,
    //   value: parsedAmount,
    // });
    // return tx;
  }
}
