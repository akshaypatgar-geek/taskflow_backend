import { taskPriorityEnum, taskStatusEnum } from "../../db/schema";
export declare abstract class TasksRepository {
    abstract createTask(dto: any, authorId: string): any;
    abstract findById(id: string): any;
    abstract findByAuthorId(authorId: string, priority?: any, categoryId?: string, cursor?: string, limit?: number, searchKey?: string, status?: typeof taskStatusEnum.arguments, startDate?: string, endDate?: string, sortBy?: 'date' | 'priority', sortOrder?: 'asc' | 'desc'): any;
    abstract updateTask(id: string, status?: (typeof taskStatusEnum.arguments)[number], priority?: (typeof taskPriorityEnum.enumValues)[number], categoryId?: string, title?: string): any;
    abstract deleteTask(id: string): any;
}
