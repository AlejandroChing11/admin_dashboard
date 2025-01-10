import { IsOptional, IsString } from 'class-validator';

export class UpdatePreferencesDto {

  @IsOptional()
  @IsString()
  comidaFavorita?: string;

  @IsOptional()
  @IsString()
  artistaFavorito?: string;

  @IsOptional()
  @IsString()
  lugarFavorito?: string;

  @IsOptional()
  @IsString()
  colorFavorito?: string;
}
