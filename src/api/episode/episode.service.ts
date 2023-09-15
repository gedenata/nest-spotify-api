import { Injectable } from '@nestjs/common';

@Injectable()
export class EpisodeService {
  async getEpisode() {}

  async getSeveralEpisodes() {}

  async getUserSavedEpisodes() {}

  async saveEpisodesForCurrentUser() {}

  async removeUserSavedEpisodes() {}

  async checkUserSavedEpisodes() {}
}
