import { IsString, IsEmail, MinLength, IsOptional, MaxLength, Matches } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsString()
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  apellido: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'El teléfono debe tener al menos 10 caracteres' })
  telefono: string;

  @IsString()
  @MinLength(2)
  pais: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero'
  })
  password: string;

  @IsString()
  @MaxLength(50)
  comidaFavorita: string;

  @IsString()
  @MaxLength(50)
  artistaFavorito: string;

  @IsString()
  @MaxLength(50)
  lugarFavorito: string;

  @IsString()
  @MaxLength(50)
  colorFavorito: string;

}
