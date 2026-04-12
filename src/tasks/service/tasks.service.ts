import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { taskPriorityEnum, taskStatusEnum } from 'src/db/schema';
import { CreateTaskDto } from '../dto/create.task.dto';
import { CategoriesRepository } from 'src/categories/repository/categories.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksGateway } from '../websocket/tasks.gateway';
import { FirebaseService } from 'src/firebase/firebase.service';


@Injectable()
export class TasksService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly categoryRepo: CategoriesRepository,
    private readonly repository: TasksRepository,
    private readonly gateway: TasksGateway,
    private readonly firebaseService: FirebaseService
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
     
     // Send Push Notification
     await this.firebaseService.sendToTopic(
       authorId,
       'Task Created',
       `A new task "${task.title}" has been created.`,
       { taskId: task.id }
     );

    return task;
  }

  async findById(id: string, authorId: string) {
    const user = await this.userRepo.findById(authorId);
    if (!user) throw new NotFoundException("User does not exist");

    const task = await this.repository.findById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
     if(task.authorId !== authorId) {
      throw new ForbiddenException("User not allowed to view task");
    }
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
     if(task.authorId !== authorId) {
      throw new ForbiddenException("User not allowed to delete task");
    }
    if(categoryId) {
      const category = await this.categoryRepo.findById(categoryId);
      if(!category) {
        throw new NotFoundException("Category not found");
      }
    }
    const updatedTask = await this.repository.updateTask(id, status, priority, categoryId , title);
    this.gateway.notifyTaskUpdated(updatedTask);

    // Send Push Notification
    await this.firebaseService.sendToTopic(
      authorId,
      'Task Updated',
      `Task "${updatedTask.title}" has been updated.`,
      { taskId: updatedTask.id }
    );

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
    if(task.authorId !== authorId) {
      throw new ForbiddenException("User not allowed to delete task");
    }
    const deleteId = await this.repository.deleteTask(id);
    this.gateway.notifyTaskDeleted(deleteId, authorId);

    // Send Push Notification
    await this.firebaseService.sendToTopic(
      authorId,
      'Task Deleted',
      `Task "${task.title}" has been deleted.`,
      { taskId: id }
    );

    return { id: deleteId };
  }
}