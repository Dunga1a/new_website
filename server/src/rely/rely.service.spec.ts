import { Test, TestingModule } from '@nestjs/testing';
import { RelyService } from './rely.service';

describe('RelyService', () => {
  let service: RelyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelyService],
    }).compile();

    service = module.get<RelyService>(RelyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
