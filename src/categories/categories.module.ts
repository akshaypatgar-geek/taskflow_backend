import { Module } from '@nestjs/common';
import { CategoriesController } from '../categories/controller/categories.controller';
import { CategoriesService } from '../categories/service/categories.service';
import { UsersModule } from 'src/users/users.module';
import { CategoriesRepository } from './repository/categories.repository';
import { CategoriesRepositoryImpl } from './repository/categories.repository.impl';

@Module({
  imports:[UsersModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, {
    provide: CategoriesRepository,
    useClass: CategoriesRepositoryImpl
  }],
  exports:[CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}
