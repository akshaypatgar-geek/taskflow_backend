"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryImpl = void 0;
const schema_1 = require("../../db/schema");
const db_module_1 = require("../../db/db.module");
const drizzle_orm_1 = require("drizzle-orm");
const common_1 = require("@nestjs/common");
const user_exists_exception_1 = require("../exceptions/user.exists.exception");
let UsersRepositoryImpl = class UsersRepositoryImpl {
    async createUser(email, password) {
        return await db_module_1.db.transaction(async (trx) => {
            try {
                const [user] = await trx
                    .insert(schema_1.userTable)
                    .values({ email, password: password })
                    .returning();
                return user;
            }
            catch (error) {
                if (error.cause.code === '23505') {
                    throw new user_exists_exception_1.UserExistsException(`User with email ${email} already exists`);
                }
                throw error;
            }
        });
    }
    async findById(id) {
        const [user] = await db_module_1.db
            .select()
            .from(schema_1.userTable)
            .where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
        return user;
    }
    async findByEmail(email) {
        const [user] = await db_module_1.db
            .select()
            .from(schema_1.userTable)
            .where((0, drizzle_orm_1.eq)(schema_1.userTable.email, email));
        return user;
    }
    async updateUserData(id, name, profilePicture) {
        return await db_module_1.db.transaction(async (trx) => {
            const [user] = await db_module_1.db
                .select()
                .from(schema_1.userTable)
                .where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
            const updateData = {};
            if (name)
                updateData.name = name;
            if (profilePicture)
                updateData.profilePicture = profilePicture;
            let updatedUser;
            if (Object.keys(updateData).length > 0) {
                [updatedUser] = await trx
                    .update(schema_1.userTable)
                    .set(updateData)
                    .where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id))
                    .returning();
            }
            else {
                updatedUser = user;
            }
            return {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                status: updatedUser.status,
                profilePicture: updatedUser.profilePicture,
            };
        });
    }
};
exports.UsersRepositoryImpl = UsersRepositoryImpl;
exports.UsersRepositoryImpl = UsersRepositoryImpl = __decorate([
    (0, common_1.Injectable)()
], UsersRepositoryImpl);
//# sourceMappingURL=users.repository.impl.js.map