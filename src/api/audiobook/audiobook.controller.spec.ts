import { Test, TestingModule } from '@nestjs/testing';
import { AudiobookController } from './audiobook.controller';

describe('AudiobookController', () => {
  let controller: AudiobookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudiobookController],
    }).compile();

    controller = module.get<AudiobookController>(AudiobookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
