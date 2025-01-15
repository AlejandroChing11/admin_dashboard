import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUserDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService
  ) { }

  async create(createUserDto: CreateUsuarioDto) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)

      try {
        const emailData = {
          sender: {
            name: 'We Plot',
            email: 'alejandroching2004@hotmail.com'
          },
          to: [{
            email: user.email,
            name: user.nombre
          }],
          subject: '¡Bienvenido a nuestra aplicación!',
          htmlContent: `
            <h1>¡Bienvenido ${user.nombre}!</h1>
            <p>Gracias por registrarte en nuestra aplicación.</p>
            <p>Esperamos que disfrutes de nuestros servicios.</p>
          `
        };

        await axios.post('https://api.sendinblue.com/v3/smtp/email', emailData, {
          headers: {
            'api-key': this.configService.get('BREVO_API_KEY'),
            'Content-Type': 'application/json',
          },
        });

        console.log('Email de bienvenida enviado exitosamente');
      } catch (emailError) {
        console.error('Error al enviar el correo de bienvenida:', emailError);
      }

      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      console.log(error);
      throw new ConflictException(error.message);
    }



  }

  async login(loginUserDto: LoginUsuarioDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas: email no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas: contraseña incorrecta');
    }

    return {
      message: 'Login exitoso',
      token: this.getJwtToken({ id: user.id })
    };
  }


  async getMe(user: Usuario) {

    try {
      const userData = await this.userRepository.findOne({
        where: { id: user.id },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          roles: true,
          imagePath: true,
          comidaFavorita: true,
          artistaFavorito: true,
          lugarFavorito: true,
          colorFavorito: true,
        }
      });

      if (!userData) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return userData;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al buscar usuario');
    }

  } 

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);

    return token

  }

}
