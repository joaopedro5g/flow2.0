import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';

export const Me = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const typeRequest = ctx.getType();
    return typeRequest === 'http'
      ? ctx.switchToHttp().getRequest<Request & { user: UserEntity }>().user
      : typeRequest === 'ws'
        ? ctx.switchToWs().getClient<Socket & { user: UserEntity }>().user
        : ({} as UserEntity);
  },
);
