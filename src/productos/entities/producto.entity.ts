// src/productos/entities/producto.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('productos')
export class Producto {
  @ApiProperty({ example: 1, description: 'ID único del producto' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Smartphone XYZ', description: 'Nombre del producto' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: 'Smartphone de última generación con 128GB', description: 'Descripción del producto' })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ example: 599.99, description: 'Precio del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ example: 100, description: 'Cantidad en stock' })
  @Column({ default: 0 })
  stock: number;

  @ApiProperty({ example: true, description: 'Estado del producto (activo/inactivo)' })
  @Column({ default: true })
  activo: boolean;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @ApiProperty({ type: () => Categoria, description: 'Categoría a la que pertenece el producto' })
  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}