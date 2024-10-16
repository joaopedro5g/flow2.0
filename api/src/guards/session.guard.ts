/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request & { user: UserEntity }>();
    if (!req.headers['authorization']) return false;
    const [type, token] = req.headers['authorization'].split(' ');
    if (type !== 'Bearer')
      throw new BadRequestException({
        message: `token type ${type} is not suported`,
      });
    const validate = await this.auth.validate(token);
    if (validate) {
      req.user = validate;
      return true;
    } else {
      return false;
    }
  }
}
