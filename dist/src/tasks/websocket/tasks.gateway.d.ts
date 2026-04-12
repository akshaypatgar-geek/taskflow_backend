import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Task } from "../../db/schema";
import { UsersRepository } from "../../users/repository/users.repository";
export declare class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly userRepo;
    constructor(jwtService: JwtService, userRepo: UsersRepository);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handlePing(data: any, client: Socket): {
        event: string;
        data: string;
    };
    notifyTaskCreated(task: Task): void;
    notifyTaskUpdated(task: Task): void;
    notifyTaskDeleted(taskId: string, authorId: string): void;
}
