import { Module } from '@nestjs/common';
import { FlowConnectGateway } from 'src/ws/flow-connect.gateway';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [FlowConnectGateway],
})
export class FlowConnectModule {}
