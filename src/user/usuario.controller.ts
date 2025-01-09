import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './usuario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUsuarioDto, LoginUsuarioDto, UpdateUserDto } from './dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('registro')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const extension = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Solo se permiten imagenes'), false)
        }
        callback(null, true)
      }
    })
  )
  createUser(
    @Body() createUserDto: CreateUsuarioDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const userData = {
      ...createUserDto,
      imagePath: file ? `uploads/${file.filename}` : null
    }
    return this.userService.create(userData);
  }

  @Post('login')
  loginUser(
    @Body() LoginUsuarioDto: LoginUsuarioDto
  ) {
    return this.userService.login(LoginUsuarioDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
