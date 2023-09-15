// import { Injectable } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class OAuthService {
//   async generateAuthorizationCode(user: any): Promise<string> {
//     const authorizationCode = `${user.id}-authorization-code`;
//     return authorizationCode;
//   }

//   async exchangeCodeForToken(code: string) {
//     // Implement the logic to exchange the authorization code for an access token
//     const clientId = 'your-client-id'; // Replace with your Spotify client ID
//     const clientSecret = 'your-client-secret'; // Replace with your Spotify client secret
//     const redirectUri = 'your-redirect-uri'; // Replace with your Spotify redirect URI

//     try {
//       // Make a POST request to Spotify's token endpoint
//       const response = await axios.post(
//         'https://accounts.spotify.com/api/token',
//         null,
//         {
//           params: {
//             code,
//             grant_type: 'authorization_code',
//             redirect_uri: redirectUri,
//           },
//           auth: {
//             username: clientId,
//             password: clientSecret,
//           },
//         },
//       );

//       // Handle the response from Spotify's token endpoint
//       const accessToken = response.data.access_token;
//       return accessToken;
//     } catch (error) {
//       // Handle errors, e.g., network errors or invalid response from Spotify
//       console.error('Error exchanging code for token:', error.message);
//       throw new Error('Error exchanging code for token');
//     }
//   }
// }
