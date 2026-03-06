import { UsersRepository } from '../repository/users.repository';
export declare class UsersService {
    private readonly repository;
    constructor(repository: UsersRepository);
    createUser(email: string, password: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<any>;
    updateUser(id: string, name?: string, profilePicture?: string): Promise<any>;
}
