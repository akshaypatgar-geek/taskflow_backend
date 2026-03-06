export declare abstract class UsersRepository {
    abstract createUser(email: string, password: string): any;
    abstract findById(id: string): any;
    abstract findByEmail(email: string): any;
    abstract updateUserData(id: string, name?: string, profilePicture?: string): any;
}
