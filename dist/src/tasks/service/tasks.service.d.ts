import { taskPriorityEnum, taskStatusEnum } from 'src/db/schema';
import { CreateTaskDto } from '../dto/create.task.dto';
import { CategoriesRepository } from 'src/categories/repository/categories.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { TasksRepository } from '../repository/tasks.repository';
import { TasksGateway } from '../websocket/tasks.gateway';
export declare class TasksService {
    private readonly userRepo;
    private readonly categoryRepo;
    private readonly repository;
    private readonly gateway;
    constructor(userRepo: UsersRepository, categoryRepo: CategoriesRepository, repository: TasksRepository, gateway: TasksGateway);
    createTask(dto: CreateTaskDto, authorId: string): Promise<any>;
    findById(id: string, authorId: string): Promise<any>;
    findByAuthorId(authorId: string, priority?: typeof taskPriorityEnum.arguments, categoryId?: string, cursor?: string, limit?: number, searchKey?: string, status?: typeof taskStatusEnum.arguments, startDate?: string, endDate?: string, sortBy?: 'date' | 'priority', sortOrder?: 'asc' | 'desc'): Promise<any>;
    updateTask(id: string, authorId: string, status?: (typeof taskStatusEnum.enumValues)[number], priority?: (typeof taskPriorityEnum.enumValues)[number], categoryId?: string, title?: string): Promise<any>;
    deleteTask(id: string, authorId: string): Promise<{
        id: any;
    }>;
}
