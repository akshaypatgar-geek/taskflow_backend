import { Controller, Post, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { LoginResponseDTO } from '../dto/login.response.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags("Authentication")
@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @ResponseDto(LoginResponseDTO)
  @ApiOkResponse({type: LoginResponseDTO})
  @ApiBadRequestResponse()
  @Public()
  @Post('login')
  async login(@Body()  loginDTO: LoginDTO) {
    const {email, password} = loginDTO;
    const user = await this.authService.validateUser(email, password);
   
    return this.authService.login(user);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @ResponseDto(LoginResponseDTO)
  @ApiOkResponse({type: LoginResponseDTO})
  @ApiUnauthorizedResponse({
    description:"Unauthorized user"
  })
  @Post('refresh') 
  async refresh(@Req() req: any) {
    return this.authService.login(req.user);
  }
}