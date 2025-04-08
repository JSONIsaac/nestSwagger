import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Length } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty({
        example: 'Tecnologia',
        description: 'Nombre de la categoria',
        required: true
    })
    @IsNotEmpty({
        message: 'El nombre es requerido'
    })
    @IsString({
        message: 'El nombre debe ser una cadena de texto'
    })
    @Length(2, 100, {
        message: 'El anombre debe tener entre 2 y 100 caracteres'
    })
    nombre: string;

    @ApiProperty({
        example: 'Categoria de tecnologia',
        description: 'Descripcion de la categoria',
        required: false
    })
    @IsOptional()
    @IsString({
        message: 'La descripcion debe ser una cadena de texto'
    })
    descripcion?: string;

    @ApiProperty({
        example: true,
        description: 'Estado de la categoria (activa/inactiva)',
        required: false,
        default: true
    })
    @IsOptional()
    @IsBoolean({
        message: 'El estado de la categoria debe ser un booleano'
    })
    activa?: boolean;
}