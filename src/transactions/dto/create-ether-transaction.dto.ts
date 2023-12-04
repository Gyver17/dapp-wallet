import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateEtherTransactionDto {
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
