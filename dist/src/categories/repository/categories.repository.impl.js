"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_module_1 = require("../../db/db.module");
const schema_1 = require("../../db/schema");
let CategoriesRepositoryImpl = class CategoriesRepositoryImpl {
    async create(title) {
        return await db_module_1.db.transaction(async (trx) => {
            const [newCategory] = await trx
                .insert(schema_1.categoriesTable)
                .values({ title })
                .returning();
            return newCategory;
        });
    }
    async findById(id) {
        const [category] = await db_module_1.db
            .select()
            .from(schema_1.categoriesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.categoriesTable.id, id));
        return category;
    }
    async findByTitle(title) {
        const [category] = await db_module_1.db
            .select()
            .from(schema_1.categoriesTable)
            .where((0, drizzle_orm_1.ilike)(schema_1.categoriesTable.title, title));
        return category;
    }
    async getCategories(cursor, limit = 10) {
        let parsedCursor = undefined;
        if (cursor) {
            parsedCursor = JSON.parse(Buffer.from(cursor, 'base64').toString());
        }
        const categories = await db_module_1.db
            .select()
            .from(schema_1.categoriesTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.categoriesTable.status, 'ACTIVE'), parsedCursor ? (0, drizzle_orm_1.lt)(schema_1.categoriesTable.id, parsedCursor.id) : undefined))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.categoriesTable.id))
            .limit(limit + 1);
        const hasNextPage = categories.length > limit;
        const data = hasNextPage ? categories.slice(0, limit) : categories;
        const nextCursor = hasNextPage && data.length
            ? Buffer.from(JSON.stringify({
                id: data[data.length - 1].id,
            })).toString('base64')
            : undefined;
        return {
            categories: data,
            nextCursor,
            hasNextPage
        };
    }
};
exports.CategoriesRepositoryImpl = CategoriesRepositoryImpl;
exports.CategoriesRepositoryImpl = CategoriesRepositoryImpl = __decorate([
    (0, common_1.Injectable)()
], CategoriesRepositoryImpl);
//# sourceMappingURL=categories.repository.impl.js.map