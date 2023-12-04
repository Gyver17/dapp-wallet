import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { BcEtherService } from 'src/bc-ether/bc-ether.service';
import { PrismaService } from 'src/database/prisma.service';
import { TokenContractsService } from 'src/token-contracts/token-contracts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcEtherService: BcEtherService,
    private readonly tokenContractsService: TokenContractsService,
    private readonly usersService: UsersService,
  ) {}

  async createTransaction(
    user: User,
    from: string,
    to: string,
    hash: string,
    amount: string,
    tokenId?: string,
  ) {
    const transaction = await this.prisma.transaction.create({
      data: {
        from,
        to,
        hash,
        userId: user.id,
        value: amount,
        tokenId,
      },
    });

    return transaction;
  }

  async createTokenTransaction(
    user: User,
    tokenId: string,
    fromPrivateKey: string,
    emailOrUsername: string,
    amount: number,
  ) {
    const token = await this.tokenContractsService.findOneAndThrow(tokenId);

    const toUser = await this.usersService.findByEmailOrUsername(
      emailOrUsername,
    );

    if (!toUser || toUser.id === user.id) {
      throw new BadRequestException('User invalid');
    }

    const blockchainTransaction = await this.bcEtherService.transferToken(
      token,
      fromPrivateKey,
      toUser.walletAddress,
      amount,
    );

    return this.createTransaction(
      user,
      user.walletAddress,
      toUser.walletAddress,
      blockchainTransaction.hash,
      blockchainTransaction.value.toString(),
      token.id,
    );
  }

  async createEtherTransaction(
    user: User,
    fromPrivateKey: string,
    emailOrUsername: string,
    amount: number,
  ) {
    const toUser = await this.usersService.findByEmailOrUsername(
      emailOrUsername,
    );

    if (!toUser || toUser.id === user.id) {
      throw new BadRequestException('User invalid');
    }

    const blockchainTransaction = await this.bcEtherService.transferEther(
      fromPrivateKey,
      toUser.walletAddress,
      amount,
    );

    return this.createTransaction(
      user,
      user.walletAddress,
      toUser.walletAddress,
      blockchainTransaction.hash,
      blockchainTransaction.value.toString(),
    );
  }
}
