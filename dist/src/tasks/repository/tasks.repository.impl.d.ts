import { taskPriorityEnum, taskStatusEnum } from "../../db/schema";
import { CreateTaskDto } from '../dto/create.task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskMutationResponseDto } from '../dto/create.task.response.dto';
import { TaskDTO } from '../dto/task.dto';
export declare class TasksRepositoryImpl implements TasksRepository {
    createTask(dto: CreateTaskDto, authorId: string): Promise<TaskMutationResponseDto>;
    findById(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        priority: "LOW" | "MEDIUM" | "HIGH" | null;
        categoryId: string | null;
        status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
    }>;
    findByAuthorId(authorId: string, priority?: typeof taskPriorityEnum.arguments, categoryId?: string, cursor?: string, limit?: number, searchKey?: string, status?: typeof taskStatusEnum.arguments, startDate?: string, endDate?: string, sortBy?: 'date' | 'priority', sortOrder?: 'asc' | 'desc'): Promise<{
        tasks: TaskDTO[];
        nextCursor: string | null;
        hasNextPage: boolean;
    }>;
    updateTask(id: string, status?: (typeof taskStatusEnum.enumValues)[number], priority?: (typeof taskPriorityEnum.enumValues)[number], categoryId?: string, title?: string): Promise<any>;
    deleteTask(id: string): Promise<string>;
}
