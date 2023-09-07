export const authConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'your-client-secret',
  redirectUri:
    process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback',
  scopes: ['user-read-private', 'user-read-email', 'playlist-read-private'],
};
