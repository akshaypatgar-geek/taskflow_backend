import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../db/db.module';
import { userTable } from '../../db/schema';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { UserExistsException } from '../exceptions/user.exists.exception';
import { UsersRepository } from '../repository/users.repository';


const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private readonly repository : UsersRepository){}

async createUser(email: string, password: string) {
  const existingUser = await this.repository.findByEmail(email);
  if(existingUser) {
    throw new UserExistsException(email);
  }
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
   return this.repository.createUser(email, hashedPassword);
}

async findByEmail(email: string) {
  return await this.repository.findByEmail(email);
}

async findById(id:string) {
  return await this.repository.findById(id);
}

  
  async updateUser(
    id:string,
    name?:string, profilePicture?:string
 ) {
  const [user] =await db.select()
           .from(userTable)
           .where(eq(userTable.id, id));
           if(!user) throw new NotFoundException("User not found");
  return await this.repository.updateUserData(id, name, profilePicture);
 }
}
