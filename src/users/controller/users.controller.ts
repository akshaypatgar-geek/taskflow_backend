import { Body, Controller, Get, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/decorators/public.decorator';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersService.createUser(email, password);
    // Do not return password hash in response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findById(user.id);
    
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
  @ResponseDto(UserDto)
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserDto })
  @UseInterceptors(
    FileInterceptor('profilePicture', FileUploadService.memoryMulterOptions()),
  )
  @Patch()
  async updateUser(
    @CurrentUser() user:any,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateInfo: UpdateUserDto
  ) {
    const {name} = updateInfo;
    if (file) {
    // File upload was successful
    console.log('File uploaded successfully:', file.originalname, file.size, file.mimetype);
  } else {
    console.log('No file uploaded');
  }
    return this.usersService.updateUser(user.id, name,)
  }
}