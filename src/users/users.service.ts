import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BcEtherService } from 'src/bc-ether/bc-ether.service';
import { hashString, compareHash } from 'src/common/utils/hash.util';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcEtherService: BcEtherService,
  ) {}

  async create(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) {
    const passwordHash = await hashString(password);

    const { walletAddress, privateKey } = await this.bcEtherService.generateRandomWallet();

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: passwordHash,
        privateKey,
        walletAddress,
      },
    });
  }

  async findByEmailOrUsername(emailOrUsername: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: emailOrUsername,
          },
          {
            username: emailOrUsername,
          },
        ],
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async validatePassword(user: User, password: string) {
    return await compareHash(password, user.password);
  }

  async getUserBalance(user: User) {
    return await this.bcEtherService.getBalance(user.walletAddress);
  }
}
