import { AuthService } from '../service/auth.service';
import { LoginDTO } from '../dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDTO: LoginDTO): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
