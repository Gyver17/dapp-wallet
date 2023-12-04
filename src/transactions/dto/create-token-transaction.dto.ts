import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenTransactionDto {
  @IsString()
  @IsNotEmpty()
  tokenId: string;

  @IsString()
  @IsNotEmpty()
  fromPrivateKey: string;

  @IsString()
  @IsNotEmpty()
  emailOrUsername: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
