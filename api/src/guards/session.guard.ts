/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}
  setUser(ctx: ExecutionContext, user: UserEntity) {
    const typeRequest = ctx.getType();
    if (typeRequest === 'ws')
      ctx.switchToWs().getClient<Socket & { user: UserEntity }>().user = user;
    if (typeRequest === 'http')
      ctx.switchToHttp().getRequest<Request & { user: UserEntity }>().user =
        user;
  }
  getRequest(ctx: ExecutionContext) {
    const typeRequest = ctx.getType();
    return typeRequest === 'http'
      ? ctx.switchToHttp().getRequest<Request & { user: UserEntity }>()
      : ctx.switchToWs().getClient<Socket>().handshake;
  }
  validateTokenType(ctx: ExecutionContext, type: string) {
    const typeRequest = ctx.getType();
    if (type !== 'Bearer') {
      if (typeRequest === 'http')
        throw new BadRequestException({
          message: `token type ${type} is not suported`,
        });
      if (typeRequest === 'ws') {
        ctx.switchToWs().getClient<Socket>().disconnect();
        throw new WsException({
          message: `token type ${type} is not suported`,
        });
      }
    }
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(ctx);
    if (!req.headers['authorization']) return false;
    const [type, token] = req.headers['authorization'].split(' ');
    this.validateTokenType(ctx, type);
    const user = await this.auth.validate(token);
    if (user) {
      this.setUser(ctx, user);
      return true;
    } else {
      return false;
    }
  }
}
