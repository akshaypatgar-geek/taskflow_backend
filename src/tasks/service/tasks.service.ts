import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { db } from '../../db/db.module';
import { eq, and } from 'drizzle-orm';
import { taskTable, taskPriorityEnum, taskStatusEnum } from 'src/db/schema';
import { CreateTaskDto } from '../dto/create.task.dto';
import { CategoriesRepository } from 'src/categories/repository/categories.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { TasksRepository } from '../repository/tasks.repository';
import { use } from 'passport';
import { TasksGateway } from '../websocket/tasks.gateway';


@Injectable()
export class TasksService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly categoryRepo: CategoriesRepository,
    private readonly repository: TasksRepository,
    private readonly gateway: TasksGateway
  ) {}

  async createTask(dto: CreateTaskDto, authorId:string) {
    const {  categoryId } = dto;

    const user = await this.userRepo.findById(authorId);
    if (!user) throw new NotFoundException("User does not exist");

    if (categoryId) {
      const category = await this.categoryRepo.findById(categoryId);
      if (!category) throw new NotFoundException("Category not found");
    }
    const task =await this.repository.createTask(dto, authorId);
   
     this.gateway.notifyTaskCreated(task)
    return task;
  }

  async findById(id: string, authorId: string) {
    const user = await this.userRepo.findById(authorId);
    if (!user) throw new NotFoundException("User does not exist");

    const task = await this.repository.findById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async findByAuthorId(authorId: string, priority?: typeof taskPriorityEnum.arguments, categoryId?: string,cursor?: string,
  limit = 10,searchKey?:string,status?: typeof taskStatusEnum.arguments,
  startDate?: string,
  endDate?: string,
  sortBy: 'date' | 'priority' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc',) {
    const user = await this.userRepo.findById(authorId);
    if (!user) throw new NotFoundException("User does not exist");
    return await this.repository.findByAuthorId(authorId,priority, categoryId , cursor, limit, searchKey,status,
    startDate,
    endDate,
    sortBy,
    sortOrder);
  }

  async updateTask(id:string, authorId:string, status?:(typeof taskStatusEnum.enumValues)[number], priority?: (typeof taskPriorityEnum.enumValues)[number], categoryId?:string, title?:string) {
    const user = await this.userRepo.findById(authorId);
    if(!user) {
      throw new NotFoundException("User not found");
    }
    const task = await this.repository.findById(id);
    if(!task) {
      throw new NotFoundException("Task not found");
    }
    if(categoryId) {
      const category = this.categoryRepo.findById(categoryId);
      if(!category) {
        throw new NotFoundException("Category not found");
      }
    }
    const updatedTask = await this.repository.updateTask(id, status, priority, categoryId , title);
    this.gateway.notifyTaskUpdated(updatedTask);
    return updatedTask;
  }

  async deleteTask(id:string, authorId:string) {
    const user = await this.userRepo.findById(authorId);
    if(!user) {
      throw new NotFoundException("User not found");
    }
    const task = await this.repository.findById(id);
    if(!task) {
      throw new NotFoundException("Task not found");
    }
    const deleteId = await this.repository.deleteTask(id);
    this.gateway.notifyTaskDeleted(deleteId, authorId);
    return { id: deleteId };
  }
}