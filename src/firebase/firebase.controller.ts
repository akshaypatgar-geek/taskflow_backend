import { Controller, Post, Body, Delete } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CurrentUser } from '../decorators/current.user.decorator';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('subscribe')
  async subscribe(@CurrentUser() user: any, @Body() dto: SubscribeDto) {
    return await this.firebaseService.subscribeToTopic(dto.fcmToken, user.id);
  }

  @Post('unsubscribe')
  async unsubscribe(@CurrentUser() user: any, @Body() dto: SubscribeDto) {
    return await this.firebaseService.unsubscribeFromTopic(dto.fcmToken, user.id);
  }
}
