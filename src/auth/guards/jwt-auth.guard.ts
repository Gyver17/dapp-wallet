import { Injectable, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export const UseJwtAuthGuard = () => applyDecorators(UseGuards(JwtAuthGuard));
