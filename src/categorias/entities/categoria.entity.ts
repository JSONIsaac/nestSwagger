import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {
    @ApiProperty({
        example: '1',
        description: 'ID de la categoria es unica y autoincrementable',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Tecnologia',
        description: 'Nombre de la categoria',
        required: true
    })
    @Column({length: 100, unique: true})
    nombre: string;

    @ApiProperty({
        example: 'Categoria de tecnologia',
        description: 'Descripcion de la categoria',
        required: false
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    descripcion: string;

    @ApiProperty({
        example: true,
        description: 'Estado de la categoria (activa o inactiva)',
    })
    @Column({default: true})
    activa: boolean;

    @ApiProperty({
        description: 'Fecha de creacion de la categoria',
        example: '2023-10-01T00:00:00.000Z',
    })
    @Column({
        name: 'creado_en', 
    })
    creadoEn: Date;

    @ApiProperty({description: 'Productos de la categoria'})
    @OneToMany('Producto', 'categoria')
    productos: any[];
}