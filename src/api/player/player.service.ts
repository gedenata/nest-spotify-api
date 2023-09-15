import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  async getPlaybackState() {}

  async transferPlayback() {}

  async getAvailableDevices() {}

  async getCurrentlyPlayingTrack() {}

  async startPlayback() {}

  async pausePlayback() {}

  async skipToNext() {}

  async skipToPrevious() {}

  async seekToPosition() {}

  async setRepeatMode() {}

  async setPlaybackVolume() {}

  async togglePlaybackShuffle() {}

  async getRecentlyPlayedTracks() {}

  async getUserQueue() {}

  async addItemToPlaybackQueue() {}
}
