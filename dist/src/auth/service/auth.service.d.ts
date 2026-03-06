import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/users.repository';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: UsersRepository, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
