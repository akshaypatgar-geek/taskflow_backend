"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRelations = exports.cateogryRelations = exports.userRelations = exports.taskTable = exports.categoriesTable = exports.userTable = exports.categoryEnum = exports.SortOrderEnum = exports.SortByEnum = exports.taskStatusEnum = exports.TASK_PRIORITIES = exports.taskPriorityEnum = exports.userStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const pg_core_5 = require("drizzle-orm/pg-core");
const pg_core_6 = require("drizzle-orm/pg-core");
const pg_core_7 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.userStatusEnum = (0, pg_core_2.pgEnum)("userStatus", ["ACTIVE", "INACTIVE"]);
exports.taskPriorityEnum = (0, pg_core_2.pgEnum)("taskPriority", ["LOW", "MEDIUM", "HIGH"]);
exports.TASK_PRIORITIES = [...exports.taskPriorityEnum.enumValues];
exports.taskStatusEnum = (0, pg_core_2.pgEnum)("taskStatusEnum", ["OPEN", "IN_PROGRESS", "COMPLETED"]);
var SortByEnum;
(function (SortByEnum) {
    SortByEnum["DATE"] = "date";
    SortByEnum["PRIORITY"] = "priority";
})(SortByEnum || (exports.SortByEnum = SortByEnum = {}));
var SortOrderEnum;
(function (SortOrderEnum) {
    SortOrderEnum["ASC"] = "asc";
    SortOrderEnum["DESC"] = "desc";
})(SortOrderEnum || (exports.SortOrderEnum = SortOrderEnum = {}));
exports.categoryEnum = (0, pg_core_2.pgEnum)("categoryEnum", ["ACTIVE", "INACTIVE"]);
exports.userTable = (0, pg_core_6.pgTable)('user', {
    id: (0, pg_core_5.uuid)('id').primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 28 }),
    password: (0, pg_core_4.text)('password').notNull(),
    status: (0, exports.userStatusEnum)('status').default("ACTIVE").notNull(),
    email: (0, pg_core_4.text)("email").notNull().unique(),
    profilePicture: (0, pg_core_4.text)('profile_picture').default('')
});
exports.categoriesTable = (0, pg_core_6.pgTable)("category", {
    id: (0, pg_core_5.uuid)("id").primaryKey().notNull().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", {
        length: 50
    }).notNull(),
    status: (0, exports.categoryEnum)("status").default("ACTIVE"),
});
exports.taskTable = (0, pg_core_6.pgTable)("task", {
    id: (0, pg_core_5.uuid)("id").primaryKey().notNull().defaultRandom(),
    title: (0, pg_core_4.text)("title").notNull(),
    createdAt: (0, pg_core_3.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_3.timestamp)("updated_at").notNull().defaultNow(),
    authorId: (0, pg_core_5.uuid)('author_id').notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    priority: (0, exports.taskPriorityEnum)("priority").default("LOW"),
    categoryId: (0, pg_core_5.uuid)("category_id").references(() => exports.categoriesTable.id, { onDelete: "set null" }),
    status: (0, exports.taskStatusEnum)("task_status").notNull().default("OPEN")
}, (table) => {
    return {
        authorIdx: (0, pg_core_7.index)("author_idx").on(table.authorId),
        categoryIdx: (0, pg_core_7.index)("category_idx").on(table.categoryId),
        authorCreatedIdDescIdx: (0, pg_core_7.index)("idx_task_author_created_id_desc").on(table.authorId, table.createdAt.desc(), table.id.desc()),
    };
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    tasks: many(exports.taskTable),
}));
exports.cateogryRelations = (0, drizzle_orm_1.relations)(exports.categoriesTable, ({ many }) => ({
    tasks: many(exports.taskTable)
}));
exports.taskRelations = (0, drizzle_orm_1.relations)(exports.taskTable, ({ one }) => ({
    author: one(exports.userTable, {
        fields: [exports.taskTable.authorId],
        references: [exports.userTable.id]
    }),
    category: one(exports.categoriesTable, {
        fields: [exports.taskTable.categoryId],
        references: [exports.categoriesTable.id]
    })
}));
//# sourceMappingURL=schema.js.map