// import { Injectable } from '@nestjs/common';
// import { authConfig } from 'src/auth/auth.config';
// import * as querystring from 'querystring';
// import axios from 'axios';

// @Injectable()
// export class SpotifyAuthService {
//   getAuthorizationUrl() {
//     const queryParams = {
//       client_id: authConfig.clientId,
//       redirect_uri: authConfig.redirectUri,
//       response_type: 'code',
//       scope: authConfig.scopes.join(' '),
//     };
//     const queryString = querystring.stringify(queryParams);
//     return `https://accounts.spotify.com/authorize?${queryString}`;
//   }

//   async exchangeCodeForAccessToken(code: string) {
//     // Define the Spotify token endpoint URL
//     const tokenEndpoint = 'https://accounts.spotify.com/api/token';

//     // Create data object with the required parameters
//     const data = {
//       grant_type: 'authorization_code',
//       code,
//       redirect_uri: authConfig.redirectUri,
//     };

//     // Define the headers for the POST request
//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     };

//     // Encode the client ID and client secret for basic authentication
//     const authHeader = `Basic ${Buffer.from(
//       `${authConfig.clientId}:${authConfig.clientSecret}`,
//     )}`;
//     headers['Authorization'] = authHeader;

//     try {
//       // Make the POST request to Spotify's token endpoint
//       const response = await axios.post(
//         tokenEndpoint,
//         querystring.stringify(data),
//         { headers },
//       );

//       // Handle the response and extract the access token
//       const { access_token } = response.data;
//       return access_token;
//     } catch (error) {
//       throw new Error('Error exchanging code for access token.');
//     }
//   }
// }
