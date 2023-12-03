import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UseJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BcEtherService } from 'src/bc-ether/bc-ether.service';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { TokenContractsService } from 'src/token-contracts/token-contracts.service';

@UseJwtAuthGuard()
@Controller('balances')
export class BalancesController {
  constructor(
    private readonly bcEtherService: BcEtherService,
    private readonly tokenContractsService: TokenContractsService,
  ) {}

  @Get('wallet')
  async balance(@UserDecorator() user: User) {
    return this.bcEtherService.getBalance(user.walletAddress);
  }

  @Get('token/:tokenId')
  async tokenBalance(
    @UserDecorator() user: User,
    @Param('tokenId') tokenId: string,
  ) {
    const token = await this.tokenContractsService.findOneAndThrow(tokenId);
    return this.bcEtherService.getTokenBalance(token, user.walletAddress);
  }
}
