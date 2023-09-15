import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  async getTrack() {}

  async getSeveralTracks() {}

  async getUserSavedTracks() {}

  async saveTracksForCurrentUser() {}

  async removeUserSavedTracks() {}

  async checkUserSavedTracks() {}

  async getTracksAudioFeatures() {}

  async getTrackAudioFeatures() {}

  async getTrackAudioAnalysis() {}

  async getRecommendations() {}
}
