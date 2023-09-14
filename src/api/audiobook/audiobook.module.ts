import { Module } from '@nestjs/common';
import { AudiobookController } from './audiobook.controller';
import { AudiobookService } from './audiobook.service';

@Module({
  controllers: [AudiobookController],
  providers: [AudiobookService]
})
export class AudiobookModule {}
