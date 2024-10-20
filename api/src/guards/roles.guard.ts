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
import { Socket } from 'socket.io';
import { MemberPlans, Role, UserEntity } from 'src/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  getUser(ctx: ExecutionContext) {
    const typeRequest = ctx.getType();
    return typeRequest === 'http'
      ? ctx.switchToHttp().getRequest<Request & { user: UserEntity }>().user
      : typeRequest === 'ws'
        ? ctx.switchToWs().getClient<Socket & { user: UserEntity }>().user
        : ({} as UserEntity);
  }
  verifyPerm(ctx: ExecutionContext, user: UserEntity) {
    const handler = this.reflector.get<{
      type: 'role' | 'plan';
      data: Role[] | MemberPlans[];
    }>('auth-method', ctx.getHandler());
    const data = handler.type === 'plan' ? user.plan : user.role;
    const perm = handler.data.includes(data as never);
    return perm;
  }
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const typeRequest = ctx.getType();
    const user = this.getUser(ctx);

    const perm = this.verifyPerm(ctx, user);
    if (!perm && typeRequest === 'ws')
      ctx.switchToWs().getClient<Socket>().disconnect();
    // console.log(user, perm);
    return perm;
  }
}
