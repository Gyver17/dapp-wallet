import { Controller, Get, UseInterceptors, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { UseJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserSerializerInterceptor } from './interceptors/user.interceptor';

@Controller('users')
@UseJwtAuthGuard()
@UseInterceptors(UserSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@UserDecorator() user: User) {
    return user;
  }

  @Get('balance')
  async balance(@UserDecorator() user: User) {
    return this.usersService.getUserBalance(user);
  }

  @Post('transfer')
  async transfer(@UserDecorator() user: User) {
    return this.usersService.deposit(user, 1);
  }
}
