


export abstract class UsersRepository {
   abstract createUser(email: string, password: string);
   abstract findById(id: string);
   abstract findByEmail(email: string);
   abstract updateUserData(id:string, name?:string, profilePicture?:string);
}