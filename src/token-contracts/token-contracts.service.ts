import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TokenContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.tokenContract.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneAndThrow(id: string) {
    const tokenContract = await this.findOne(id);

    if (!tokenContract) {
      throw new NotFoundException('Token contract not found');
    }

    return tokenContract;
  }
}
