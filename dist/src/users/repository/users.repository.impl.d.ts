import { UsersRepository } from './users.repository';
export declare class UsersRepositoryImpl implements UsersRepository {
    createUser(email: string, password: string): Promise<{
        password: string;
        id: string;
        name: string | null;
        status: "ACTIVE" | "INACTIVE";
        email: string;
        profilePicture: string | null;
    }>;
    findById(id: string): Promise<{
        id: string;
        name: string | null;
        password: string;
        status: "ACTIVE" | "INACTIVE";
        email: string;
        profilePicture: string | null;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string | null;
        password: string;
        status: "ACTIVE" | "INACTIVE";
        email: string;
        profilePicture: string | null;
    }>;
    updateUserData(id: string, name?: string, profilePicture?: string): Promise<{
        id: any;
        name: any;
        email: any;
        status: any;
        profilePicture: any;
    }>;
}
