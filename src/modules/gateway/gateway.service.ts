import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MoveRequest } from '../move-request/move-request.entity';

@WebSocketGateway({ cors: '*' })
export class GatewayService {
  @WebSocketServer()
  server: Server;
  notifyNewMoveRequest(requestData: MoveRequest) {
    this.server.emit('newMoveRequest', requestData);
  }
  notifyContractCompletion(flag: boolean) {
    this.server.emit('notifyContractCompletion', flag);
  }
}
