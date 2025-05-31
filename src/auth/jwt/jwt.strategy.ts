import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

interface JwtPayload {
  email: string;
  sub: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    const extractJwtFromCookie =
      (cookieName: string) =>
      (req: unknown): string | null => {
        const request = req as Request;
        const token = request?.cookies?.[cookieName] || null;
        console.log('Token extrait du cookie:', token);
        return token;
      };

    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (req: Request) => req?.cookies?.['oeb-token'], // 👈 lire depuis le cookie
      // ]),
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie('oeb-token'),
      ]),
      ignoreExpiration: true,
      secretOrKey: 'test', // Change this to an environment variable
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
