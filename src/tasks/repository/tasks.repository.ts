import { taskPriorityEnum, taskStatusEnum } from "src/db/schema";

export abstract class TasksRepository {
  abstract createTask(dto: any, authorId:string);

  abstract findById(id: string,);

  abstract findByAuthorId(
    authorId: string,
    
    priority?: any,
    categoryId?: string,
    cursor?: string,
    limit?:number,
    searchKey?:string,
    status?: typeof taskStatusEnum.arguments,
    startDate?: string,
    endDate?: string,
    sortBy?: 'date' | 'priority',
    sortOrder?: 'asc' | 'desc'
  );

  abstract updateTask( id:string, status?: (typeof taskStatusEnum.arguments)[number], priority?:(typeof taskPriorityEnum.enumValues)[number], categoryId?:string, title?:string);

  abstract deleteTask(id:string);
}