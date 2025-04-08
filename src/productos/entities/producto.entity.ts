import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('productos')
export class Producto {
    @ApiProperty({
        example: '1',
        description: 'ID del producto es unica y autoincrementable',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Laptop',
        description: 'Nombre del producto',
        required: true
    })
    @Column({length: 100})
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    stock: number;

    @Column({default: true})
    activo: boolean;

    @Column({name: 'creado_en'})
    creadoEn: Date;

    @ManyToOne('Categoria', 'productos')
    @JoinColumn({ name: 'categoria_id' })
    categoria: any;
}