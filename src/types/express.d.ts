import 'express';
import { JwtUserPayload } from 'src/auth/jwt/jwt-user-payload.js';
declare module 'express' {
  interface Request {
    user?: JwtUserPayload;
  }
}
