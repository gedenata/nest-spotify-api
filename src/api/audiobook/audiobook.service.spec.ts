import { Test, TestingModule } from '@nestjs/testing';
import { AudiobookService } from './audiobook.service';

describe('AudiobookService', () => {
  let service: AudiobookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudiobookService],
    }).compile();

    service = module.get<AudiobookService>(AudiobookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
