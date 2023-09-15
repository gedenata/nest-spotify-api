import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowService {
  async getShow() {}

  async getSeveralShows() {}

  async getShowEpisode() {}

  async getUserSavedShows() {}

  async saveShowsForCurrentUser() {}

  async removeUserSavedShows() {}

  async checkUserSavedShows() {}
}
