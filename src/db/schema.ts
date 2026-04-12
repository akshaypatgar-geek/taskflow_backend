import { varchar } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { Relation } from "drizzle-orm";
// user Status enums
export const userStatusEnum = pgEnum("userStatus", ["ACTIVE", "INACTIVE"])

//Priority enums
export const taskPriorityEnum = pgEnum("taskPriority",["LOW", "MEDIUM", "HIGH"])
export const TASK_PRIORITIES = [...taskPriorityEnum.enumValues] as const; 
export type TaskPriorityType = typeof TASK_PRIORITIES[number]; 



export const taskStatusEnum = pgEnum("taskStatusEnum",["OPEN", "IN_PROGRESS", "COMPLETED"])

export enum SortByEnum {
  DATE = 'date',
  PRIORITY = 'priority',
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

//Category enum
export const categoryEnum = pgEnum("categoryEnum", ["ACTIVE", "INACTIVE"])

//User Table
export const userTable = pgTable('user', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', {length: 28}),
    password: text('password').notNull(),
    status: userStatusEnum('status').default("ACTIVE").notNull(),
    email: text("email").notNull().unique(),
    profilePicture: text('profile_picture').default('')
})

export type Category = InferSelectModel<typeof categoriesTable>; // for fetching
export type NewCategory = InferInsertModel<typeof categoriesTable>;

export const categoriesTable = pgTable("category",{
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", {
        length:50
    }).notNull(),
    status: categoryEnum("status").default("ACTIVE"),
})

export type Task = InferSelectModel<typeof taskTable>;

//Tasks Table
export const taskTable = pgTable("task",{
    id:uuid("id").primaryKey().notNull().defaultRandom(),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    authorId: uuid('author_id').notNull().references(()=>userTable.id, {onDelete: "cascade"}),
    priority: taskPriorityEnum("priority").default("LOW"),
    categoryId: uuid("category_id").references(()=>categoriesTable.id, {onDelete: "set null"}),
    status: taskStatusEnum("task_status").notNull().default("OPEN")
}, (table) =>{
    return {
    authorIdx: index("author_idx").on(table.authorId),
    categoryIdx: index("category_idx").on(table.categoryId),
    authorCreatedIdDescIdx: index("idx_task_author_created_id_desc").on(
      table.authorId,
      table.createdAt.desc(),
      table.id.desc()
    ),
  };
})

//Relations
export const userRelations = relations(userTable, ({ many }) => ({
  tasks: many(taskTable),
}))

export const cateogryRelations = relations(categoriesTable, ({many}) =>({
tasks: many(taskTable)
}));

export const taskRelations = relations(taskTable, ({one })=>({
    author: one(userTable, {
        fields: [taskTable.authorId],
        references: [userTable.id]
    }),
    category: one(categoriesTable, {
        fields:[taskTable.categoryId],
        references:[categoriesTable.id]
    })
}));
