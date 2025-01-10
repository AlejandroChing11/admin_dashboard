import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,

    configService: ConfigService

  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }


  async validate(payload: JwtPayload): Promise<Usuario> {

    const { id } = payload;

    const user = await this.userRepository.findOneBy({
      id
    })

    if (!user) throw new UnauthorizedException('Token no valido')

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario de valido, comuniquese con administrador!')
    }

    return user;


  }


}