import { userTable } from 'src/db/schema';
import { db } from 'src/db/db.module';

import { eq } from 'drizzle-orm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from '../dto/user.dto';
import { UserExistsException } from '../exceptions/user.exists.exception';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  async createUser(email: string, password: string) {
    return await db.transaction(async (trx) => {
      try {
         const [user] = await trx
        .insert(userTable)
        .values({ email, password: password })
        .returning();
      return user;
      } catch(error:any) {
         if(error.cause.code === '23505') {
            throw new UserExistsException(`User with email ${email} already exists`)
         }
         throw error;
      }
    });
  }

  async findById(id: string) {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    return user;
  }

  async updateUserData(id: string, name?: string, profilePicture?: string) {
    return await db.transaction(async (trx) => {
      const [user] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, id));
      type UserUpdateData = {
        name?: string;
        profilePicture?: string;
      };
      const updateData: UserUpdateData = {};
      if (name) updateData.name = name;
      if (profilePicture) updateData.profilePicture = profilePicture;
      let updatedUser;
      if (Object.keys(updateData).length > 0) {
        [updatedUser] = await trx
          .update(userTable)
          .set(updateData)
          .where(eq(userTable.id, id))
          .returning();
      } else {
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
}
