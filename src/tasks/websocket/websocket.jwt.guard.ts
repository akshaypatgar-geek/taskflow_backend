import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;
   
    if (!token) {
      throw new WsException('Invalid credentials');
    }

    try {
      const payload = this.jwtService.verify(token);
     
    client.data = client.data || {};
    client.data.user = payload;

      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}