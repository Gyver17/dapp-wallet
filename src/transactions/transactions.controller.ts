import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UseJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTokenTransactionDto } from './dto/create-token-transaction.dto';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateEtherTransactionDto } from './dto/create-ether-transaction.dto';

@Controller('transactions')
@UseJwtAuthGuard()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('token')
  async createTokenTransaction(
    @UserDecorator() user: User,
    @Body() createTokenTransactionDto: CreateTokenTransactionDto,
  ) {
    return this.transactionsService.createTokenTransaction(
      user,
      createTokenTransactionDto.tokenId,
      createTokenTransactionDto.fromPrivateKey,
      createTokenTransactionDto.emailOrUsername,
      createTokenTransactionDto.amount,
    );
  }

  @Post('ether')
  async createEtherTransaction(
    @UserDecorator() user: User,
    @Body() createEtherTransactionDto: CreateEtherTransactionDto,
  ) {
    return this.transactionsService.createEtherTransaction(
      user,
      createEtherTransactionDto.fromPrivateKey,
      createEtherTransactionDto.emailOrUsername,
      createEtherTransactionDto.amount,
    );
  }
}
