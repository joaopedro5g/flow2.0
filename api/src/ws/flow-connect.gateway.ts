/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  ConnectedSocket,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { Auth } from 'src/decorators/auth.decorator';
import { Me } from 'src/decorators/me.decorator';
import { MemberPlans, Role, UserEntity } from 'src/entities/user.entity';
import { SessionGuard } from 'src/guards/session.guard';

@WebSocketGateway({ namespace: 'fc', cors: '*' })
export class FlowConnectGateway {
  @Auth(MemberPlans.HUMILDE, MemberPlans.BURGES)
  @SubscribeMessage('handle-connect')
  handlePing(@Me() me: UserEntity) {
    console.log(me);
  }
}
