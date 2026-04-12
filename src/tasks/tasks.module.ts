import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './service/tasks.service';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { TasksRepository } from './repository/tasks.repository';
import { TasksRepositoryImpl } from './repository/tasks.repository.impl';
import { TasksGateway } from './websocket/tasks.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [UsersModule, CategoriesModule, FirebaseModule,
    JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), // no fallback
            signOptions: { expiresIn: '15m' },
          }),
        }),
  ],
  controllers: [TasksController],
  providers: [TasksService, 
    TasksGateway,{
    provide: TasksRepository,
    useClass: TasksRepositoryImpl
  },
]
})
export class TasksModule {}

