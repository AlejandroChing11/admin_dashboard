import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 10 })
  telefono: string;

  @Column()
  @Exclude() // Excluye el campo en las respuestas
  password: string; // Cambiado a inglés por convención

  @Column({ name: 'image_path', nullable: true })
  imagePath: string;

  @Column({ name: 'comida_favorita', length: 100, nullable: true })
  comidaFavorita: string;

  @Column({ name: 'artista_favorito', length: 100, nullable: true })
  artistaFavorito: string;

  @Column({ name: 'lugar_favorito', length: 100, nullable: true })
  lugarFavorito: string;

  @Column({ name: 'color_favorito', length: 50, nullable: true })
  colorFavorito: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user'
  })
  rol: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
