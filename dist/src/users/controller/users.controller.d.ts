import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { FileUploadService } from "../../common/file-upload/file-upload.service";
export declare class UsersController {
    private readonly usersService;
    private readonly fileUploadService;
    constructor(usersService: UsersService, fileUploadService: FileUploadService);
    register(createUserDto: CreateUserDto): Promise<any>;
    getProfile(user: any): Promise<any>;
    updateUser(user: any, file: Express.Multer.File, updateInfo: UpdateUserDto): Promise<any>;
}
