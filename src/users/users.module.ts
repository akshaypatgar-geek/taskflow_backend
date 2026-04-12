import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { UsersRepositoryImpl } from './repository/users.repository.impl';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';

@Module({
  providers: [UsersService,{
    provide: UsersRepository,
    useClass: UsersRepositoryImpl
  } ],
  imports:[FileUploadModule],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository ],
})
export class UsersModule {

}
