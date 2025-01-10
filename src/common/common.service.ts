import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/user/entities/usuario.entity';
import { Repository } from 'typeorm';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  async findAllUsers() {
    try {

      const users = await this.usuarioRepository.find();

      if (!users) {
        throw new NotFoundException('No se encontraron usuarios');
      }



      return users;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al buscar usuarios');

    }

  }

  async editPreferences(id: string, updatePreferencesDto: UpdatePreferencesDto) {

    const user = await this.usuarioRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    try {

      const updatedUser = await this.usuarioRepository.save({
        ...user,
        ...updatePreferencesDto
      });

      const { password, ...result } = updatedUser;

      return result;

    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar preferencias');
    }
  }

}
