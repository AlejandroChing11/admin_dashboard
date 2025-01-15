import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, BadRequestException, Param, Query } from '@nestjs/common';
import { UserService } from './usuario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUsuarioDto, LoginUsuarioDto } from './dto';
import { Usuario } from './entities/usuario.entity';
import { Auth, GetUser } from './decorators';
import { validRoles } from './interfaces';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) { }

  @Post('registro')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './statics/uploads';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const fileName: string = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
          cb(null, fileName);
        }
      })
    })
  )
  async createUser(
    @Query('adminPass') adminPass: string,
    @Body() createUserDto: CreateUsuarioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    const serverUrl = this.configService.get('PROD_URL');
    const userData = {
      ...createUserDto,
      imagePath: `${serverUrl}/statics/uploads/${file.filename}`
    };
    return this.userService.create(userData, adminPass);
  }


  @Post('login')
  loginUser(
    @Body() LoginUsuarioDto: LoginUsuarioDto
  ) {
    return this.userService.login(LoginUsuarioDto);
  }

  @Get('getMe')
  @Auth(validRoles.user, validRoles.admin)
  getMe(
    @GetUser() user: Usuario
  ) {
    return this.userService.getMe(user);
  }

}
