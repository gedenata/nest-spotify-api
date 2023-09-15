import { Injectable } from '@nestjs/common';

@Injectable()
export class AudiobookService {
  async getAudiobook() {}

  async getSeveralAudiobooks() {}

  async getAudiobookChapters() {}

  async getUserSavedAudiobooks() {}

  async saveAudiobooksForCurrentUser() {}

  async removeUserSavedAudiobooks() {}

  async checkUserSavedAudiobooks() {}
}
