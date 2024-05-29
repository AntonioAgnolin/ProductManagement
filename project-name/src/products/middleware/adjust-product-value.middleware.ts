import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdjustProductValueMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.valor) {
      req.body.valor = req.body.valor * 1.25;
    }
    next();
  }
}
