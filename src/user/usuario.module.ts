import { Module } from '@nestjs/common';
import { UserService } from './usuario.service';
import { UserController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([Usuario]),
  ]
})
export class UserModule { }
