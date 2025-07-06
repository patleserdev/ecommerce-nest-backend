import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerCookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Cookies reçus:', req.cookies);
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  }
}
