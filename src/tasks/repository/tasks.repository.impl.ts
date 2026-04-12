import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../db/db.module';
import { taskTable, taskPriorityEnum, taskStatusEnum, Task } from 'src/db/schema';
import { CreateTaskDto } from '../dto/create.task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskMutationResponseDto } from '../dto/create.task.response.dto';
import { and, eq, lt, desc, or, SQL, like, ilike, asc, gte, lte } from 'drizzle-orm';
import { TaskDTO } from '../dto/task.dto';

@Injectable()
export class TasksRepositoryImpl implements TasksRepository {
  
  async createTask(dto: CreateTaskDto, authorId:string): Promise<TaskMutationResponseDto> {
    return await db.transaction(async (trx) => {
      const {id, title, priority, categoryId } = dto;
      const now = new Date();
    const [task] = await trx
      .insert(taskTable)
      .values({id, title, authorId, priority, categoryId,
        createdAt: now,
        updatedAt:now
      })
      .returning();

    return {
      id: task.id,
  title: task.title,
  createdAt: task.createdAt, // convert Date -> string
  updatedAt: task.updatedAt,
  authorId: task.authorId,
  priority: task.priority as typeof taskPriorityEnum.enumValues[number],
  categoryId: task.categoryId ?? null,
    };
    });
  }

  async findById(id: string,) {
    
    const [task] = await db
      .select()
      .from(taskTable)
      .where(eq(taskTable.id, id));
     
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async findByAuthorId(
    authorId: string,
    priority?: typeof taskPriorityEnum.arguments,

    categoryId?: string,
    cursor?: string,
    limit=10,
    searchKey?:string,

    status?: typeof taskStatusEnum.arguments,
    startDate?: string,
  endDate?: string,
    sortBy: 'date' | 'priority' = 'date',
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
   let parsedCursor: { createdAt: string; id: string } | undefined = undefined;
  if (cursor) {
    parsedCursor = JSON.parse(Buffer.from(cursor, 'base64').toString());
  }
  const orderColumn = sortBy === 'priority' ? taskTable.priority : taskTable.createdAt;
  const orderFn = sortOrder === 'asc' ? asc : desc;

    const rows = await db
    .select()
    .from(taskTable)
    .where(
      and(
        eq(taskTable.authorId, authorId),
        priority ? eq(taskTable.priority, priority) : undefined,
        categoryId ? eq(taskTable.categoryId, categoryId) : undefined,
        status ? eq(taskTable.status, status) : undefined,
        searchKey? ilike(taskTable.title, `%${searchKey}%`):undefined,
        startDate ? gte(taskTable.createdAt, new Date(startDate)) : undefined,
        endDate ? lte(taskTable.createdAt, new Date(endDate)) : undefined,
        parsedCursor
          ? or(
              lt(taskTable.createdAt, new Date(parsedCursor.createdAt)),
              and(
                eq(taskTable.createdAt, new Date(parsedCursor.createdAt)),
                lt(taskTable.id, parsedCursor.id)
              )
            )
          : undefined
      )
    )
    .orderBy(orderFn(orderColumn), desc(taskTable.id))
    .limit(limit + 1);
    const hasNextPage = rows.length > limit;
  const data = hasNextPage ? rows.slice(0, limit) : rows;

  const nextCursor =
    hasNextPage && data.length
      ? Buffer.from(
          JSON.stringify({
            createdAt: data[data.length - 1].createdAt,
            id: data[data.length - 1].id,
          })
        ).toString('base64')
      : null;

  return {
   tasks: data as TaskDTO[],
    nextCursor,
    hasNextPage,
  };
  
  }

  async updateTask(id:string, status?:(typeof taskStatusEnum.enumValues)[number], priority?:(typeof taskPriorityEnum.enumValues)[number], categoryId?:string, title?:string) {
    return await db.transaction(async (trx) => {
      const task = await this.findById(id);
    //  let updateInfo: Partial<Record<keyof Task, any>>={};
    type TaskUpdateFields = {
        title?: string
        priority?: (typeof taskPriorityEnum.enumValues)[number]
        status?: (typeof taskStatusEnum.enumValues)[number]
        categoryId?:string
        updatedAt?:Date
      };
      let updateInfo: TaskUpdateFields = {
      };
    if(status) {
    if(task.status !== status) {
updateInfo.status = status;
    }
  
    }
    if(title) {
      if(task.title !== title) {
updateInfo.title = title;
    }
    }
    if(priority) {
      if(task.priority !== priority) {
        updateInfo.priority = priority;
      }
      
    }
    if(categoryId) {
      if(task.categoryId !== categoryId) {
        updateInfo.categoryId = categoryId;
      }
      
    }

    let newTaskInfo;
    if(Object.keys(updateInfo).length>0) {
      updateInfo.updatedAt = new Date();
      const [updatedTask] = (await trx.update(taskTable).set(updateInfo).where(eq(taskTable.id,id)).returning());
   
    newTaskInfo= updatedTask;
    } else {
      newTaskInfo = task;
    }
    return newTaskInfo;
    });
  }

  async deleteTask(id: string) {
      return await db.transaction(async (trx) =>{
      await trx.delete(taskTable).where(eq(taskTable.id, id));
    return id;
    })
  }
}