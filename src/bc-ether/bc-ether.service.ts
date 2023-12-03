import { Injectable } from '@nestjs/common';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectEthersProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import { EtherscanProvider, ethers,JsonRpcProvider } from 'ethers';
import * as Tether from './abi/Tether.json';
import * as TheGyverToken from './abi/TheGyverToker.json';
import { ERC20Contract } from './bc-ether.types';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class BcEtherService {
  private readonly mainWalletAddress: string;

  constructor(
    @InjectEthersProvider()
    private readonly customProvider: JsonRpcProvider,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    private readonly configService: ConfigService,
  ) {
    this.mainWalletAddress = '0xA359ae3889eCE7E42Ba4D475d5c01a1a562be601';
  }

  async getBlockNumber(): Promise<number> {
    return await this.customProvider.getBlockNumber();
  }

  async getMainWallet() {
    const privateKey = this.configService.get<string>('MAIN_WALLET_PRIVATE_KEY');
    const wallet = this.ethersSigner.createWallet(privateKey);

    return wallet;
  }

  async generateRandomWallet() {
    const wallet = this.ethersSigner.createRandomWallet();

    const privateKey = wallet.privateKey
    const walletAddress = await wallet.getAddress();

    return { privateKey, walletAddress };
  }

  async getBalance(address: string) {
    const balance = await this.customProvider.getBalance(address);

    return ethers.formatEther(balance.toString());
  }

  async getTetherContract(privateKey?: string) {
    const contract = this.ethersContract.create(
      this.mainWalletAddress,
      Tether.abi,
      privateKey ? this.ethersSigner.createWallet(privateKey) : undefined,
    );


    return contract;
  }

  async getTheGyverTokenContract() {
    const contract = this.ethersContract.create(
      this.mainWalletAddress,
      TheGyverToken.abi,
    );

    return contract;
  }



  async getERC20Contract(type: ERC20Contract) {
    switch (type) {
      case ERC20Contract.Tether:
        return await this.getTetherContract();
      case ERC20Contract.TheGyverToken:
        return await this.getTheGyverTokenContract();
      default:
        throw new Error('Invalid ERC20 contract type');
    }
  }

  async getTokenBalance(type: ERC20Contract, address: string) {
    const contractInstance = await this.getERC20Contract(type);

    const balance = await contractInstance.balanceOf(address);

    return balance;
  }

  async transferToken(type: ERC20Contract, address: string, amount: number, privateKey: string) {
    // const contractInstance = await this.getERC20Contract(type);
    const contractInstance = this.ethersContract.create(
      this.mainWalletAddress,
      type === ERC20Contract.Tether ? Tether.abi : TheGyverToken.abi
    );
    const signer = await this.customProvider.getSigner();
    const parsedAmount = ethers.parseEther(amount.toString());

    const tx = await contractInstance.transfer(address, parsedAmount);

    return tx;
  }

  async transfer(address: string, amount: number, privateKey: string) {
    const signer = this.ethersSigner.createWallet(privateKey);
  }

  async transferFromMainWallet(address: string, amount: number) {
    const signer = await this.customProvider.getSigner();
    const parsedAmount = ethers.parseEther(amount.toString());

    const tx = await signer.sendTransaction({
      to: address,
      value: parsedAmount,
    });

    return tx;
  }
}
