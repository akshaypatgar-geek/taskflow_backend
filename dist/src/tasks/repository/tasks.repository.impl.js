"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../../db/db.module");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let TasksRepositoryImpl = class TasksRepositoryImpl {
    async createTask(dto, authorId) {
        return await db_module_1.db.transaction(async (trx) => {
            const { id, title, priority, categoryId } = dto;
            const now = new Date();
            const [task] = await trx
                .insert(schema_1.taskTable)
                .values({ id, title, authorId, priority, categoryId,
                createdAt: now,
                updatedAt: now
            })
                .returning();
            return {
                id: task.id,
                title: task.title,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                authorId: task.authorId,
                priority: task.priority,
                categoryId: task.categoryId ?? null,
            };
        });
    }
    async findById(id) {
        const [task] = await db_module_1.db
            .select()
            .from(schema_1.taskTable)
            .where((0, drizzle_orm_1.eq)(schema_1.taskTable.id, id));
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    async findByAuthorId(authorId, priority, categoryId, cursor, limit = 10, searchKey, status, startDate, endDate, sortBy = 'date', sortOrder = 'desc') {
        let parsedCursor = undefined;
        if (cursor) {
            parsedCursor = JSON.parse(Buffer.from(cursor, 'base64').toString());
        }
        const orderColumn = sortBy === 'priority' ? schema_1.taskTable.priority : schema_1.taskTable.createdAt;
        const orderFn = sortOrder === 'asc' ? drizzle_orm_1.asc : drizzle_orm_1.desc;
        const rows = await db_module_1.db
            .select()
            .from(schema_1.taskTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.taskTable.authorId, authorId), priority ? (0, drizzle_orm_1.eq)(schema_1.taskTable.priority, priority) : undefined, categoryId ? (0, drizzle_orm_1.eq)(schema_1.taskTable.categoryId, categoryId) : undefined, status ? (0, drizzle_orm_1.eq)(schema_1.taskTable.status, status) : undefined, searchKey ? (0, drizzle_orm_1.ilike)(schema_1.taskTable.title, `%${searchKey}%`) : undefined, startDate ? (0, drizzle_orm_1.gte)(schema_1.taskTable.createdAt, new Date(startDate)) : undefined, endDate ? (0, drizzle_orm_1.lte)(schema_1.taskTable.createdAt, new Date(endDate)) : undefined, parsedCursor
            ? (0, drizzle_orm_1.or)((0, drizzle_orm_1.lt)(schema_1.taskTable.createdAt, new Date(parsedCursor.createdAt)), (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.taskTable.createdAt, new Date(parsedCursor.createdAt)), (0, drizzle_orm_1.lt)(schema_1.taskTable.id, parsedCursor.id)))
            : undefined))
            .orderBy(orderFn(orderColumn), (0, drizzle_orm_1.desc)(schema_1.taskTable.id))
            .limit(limit + 1);
        const hasNextPage = rows.length > limit;
        const data = hasNextPage ? rows.slice(0, limit) : rows;
        const nextCursor = hasNextPage && data.length
            ? Buffer.from(JSON.stringify({
                createdAt: data[data.length - 1].createdAt,
                id: data[data.length - 1].id,
            })).toString('base64')
            : null;
        return {
            tasks: data,
            nextCursor,
            hasNextPage,
        };
    }
    async updateTask(id, status, priority, categoryId, title) {
        return await db_module_1.db.transaction(async (trx) => {
            const task = await this.findById(id);
            let updateInfo = {};
            if (status) {
                if (task.status !== status) {
                    updateInfo.status = status;
                }
            }
            if (title) {
                if (task.title !== title) {
                    updateInfo.title = title;
                }
            }
            if (priority) {
                if (task.priority !== priority) {
                    updateInfo.priority = priority;
                }
            }
            if (categoryId) {
                if (task.categoryId !== categoryId) {
                    updateInfo.categoryId = categoryId;
                }
            }
            let newTaskInfo;
            if (Object.keys(updateInfo).length > 0) {
                updateInfo.updatedAt = new Date();
                const [updatedTask] = (await trx.update(schema_1.taskTable).set(updateInfo).where((0, drizzle_orm_1.eq)(schema_1.taskTable.id, id)).returning());
                newTaskInfo = updatedTask;
            }
            else {
                newTaskInfo = task;
            }
            return newTaskInfo;
        });
    }
    async deleteTask(id) {
        return await db_module_1.db.transaction(async (trx) => {
            await trx.delete(schema_1.taskTable).where((0, drizzle_orm_1.eq)(schema_1.taskTable.id, id));
            return id;
        });
    }
};
exports.TasksRepositoryImpl = TasksRepositoryImpl;
exports.TasksRepositoryImpl = TasksRepositoryImpl = __decorate([
    (0, common_1.Injectable)()
], TasksRepositoryImpl);
//# sourceMappingURL=tasks.repository.impl.js.map