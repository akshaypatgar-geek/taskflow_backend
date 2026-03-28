import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Task } from 'src/db/schema';
import { UsersRepository } from 'src/users/repository/users.repository';
import { WsJwtGuard } from './websocket.jwt.guard';

@UseGuards(WsJwtGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private readonly jwtService: JwtService,
        private readonly userRepo: UsersRepository
    ) {}
  @WebSocketServer()
  server: Server;

  // Lifecycle hook - when client connects
 async handleConnection(client: Socket) {
  const token = client.handshake.auth?.token;
    
    if (!token) {
      client.emit('error', { message: 'Invalid credentials' });
      client.disconnect(true);
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
     
      client.data.user = payload;
      if (!payload) {
        client.emit('error', { message: 'Invalid token' });
        client.disconnect(true);
        return;
      }
      const user = await this.userRepo.findById(payload.sub);
      if (!user) {
        client.emit('error', { message: 'Unauthorised user' });
        client.disconnect(true);
        return;
      }
        client.join(user.id);
    
    } catch (err) {
      client.emit('error', { message: 'Invalid token' });
      client.disconnect(true);
      return;
    }
    
  }

  // Lifecycle hook - when client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example message listener
  @SubscribeMessage('ping')
  handlePing(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
   

    return { event: 'pong', data: 'pong response' };
  }

  notifyTaskCreated(task: Task) {
   
  this.server.to(task.authorId).emit('task.created', task);
}

// Broadcast when task is updated
notifyTaskUpdated(task: Task) {
 
  this.server.to(task.authorId).emit('task.updated', task);
}

// Broadcast when task is deleted
notifyTaskDeleted(taskId: string, authorId:string) {
  this.server.to(authorId).emit('task.deleted', { id: taskId });
}
}