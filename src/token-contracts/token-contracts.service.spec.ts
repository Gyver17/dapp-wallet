import { Test, TestingModule } from '@nestjs/testing';
import { TokenContractsService } from './token-contracts.service';

describe('TokenContractsService', () => {
  let service: TokenContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenContractsService],
    }).compile();

    service = module.get<TokenContractsService>(TokenContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
