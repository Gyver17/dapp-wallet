import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  emailOrUsername: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
