// jwt-user-payload.ts
export interface JwtUserPayload {
  id: number;
  email: string;
  sub: string;
  role: string;
}
