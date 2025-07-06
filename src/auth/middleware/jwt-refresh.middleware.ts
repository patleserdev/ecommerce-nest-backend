// src/auth/middleware/jwt-refresh.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken;
    if (!token) return next(); // Pas de token, on continue

    try {
      const decoded: any = this.jwtService.decode(token);
      const now = Math.floor(Date.now() / 1000);
      const exp = decoded?.exp;

      const timeLeft = exp - now;

      // Si le token expire dans moins de 5 minutes
      if (timeLeft < 5 * 60) {
        const newToken = this.jwtService.sign(
          {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role,
          },
          { expiresIn: '15m' },
        );
        console.log('token rafraîchit');

        res.cookie('accessToken', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
      }
    } catch (e) {
      // Token invalide, on continue sans rien faire
    }

    next();
  }
}
