// src/categorias/entities/categoria.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('categorias')
export class Categoria {
  @ApiProperty({ example: 1, description: 'ID único de la categoría' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Nombre de la categoría' })
  @Column({ length: 100, unique: true })
  nombre: string;

  @ApiProperty({ example: 'Dispositivos electrónicos de consumo', description: 'Descripción de la categoría' })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ example: true, description: 'Estado de la categoría (activa/inactiva)' })
  @Column({ default: true })
  activa: boolean;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @ApiProperty({ type: () => [Producto], description: 'Productos en esta categoría' })
  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}