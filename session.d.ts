// Create a custom session data type that includes the 'user' property
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: any; // Replace 'any' with the actual type of your user object
  }
}
