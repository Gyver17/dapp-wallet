import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UseJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BcEtherService } from 'src/bc-ether/bc-ether.service';
import { UserDecorator } from 'src/common/decorators/user.decorator';

@UseJwtAuthGuard()
@Controller('balances')
export class BalancesController {
  constructor(private readonly bcEtherService: BcEtherService) {}

  @Get('wallet')
  async balance(@UserDecorator() user: User) {
    return this.bcEtherService.getBalance(user.walletAddress);
  }

  @Get('token/:tokenId')
  async tokenBalance(
    @UserDecorator() user: User,
    @Param('tokenId') tokenId: string,
  ) {
    return this.bcEtherService.getTokenBalance(tokenId, user.walletAddress);
  }
}
