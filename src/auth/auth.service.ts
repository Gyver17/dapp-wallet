import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(emailOrUsername: string, password: string) {
    const user = await this.usersService.findByEmailOrUsername(emailOrUsername);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }

  async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) {
    const validateUsernames = await this.usersService.findByEmailOrUsername(
      username,
    );

    if (validateUsernames) {
      throw new ConflictException('Username already exists');
    }

    const validateEmails = await this.usersService.findByEmailOrUsername(email);

    if (validateEmails) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(
      firstName,
      lastName,
      username,
      email,
      password,
    );

    const accessToken = this.jwtService.sign({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }
}
