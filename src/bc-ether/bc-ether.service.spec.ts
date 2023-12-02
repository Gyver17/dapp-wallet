import { Test, TestingModule } from '@nestjs/testing';
import { BcEtherService } from './bc-ether.service';

describe('BcEtherService', () => {
  let service: BcEtherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcEtherService],
    }).compile();

    service = module.get<BcEtherService>(BcEtherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
