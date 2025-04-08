import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, Min } from "class-validator";

export class CreateProductoDto {
    @ApiProperty({
        example: 'Smartphone XYZ',
        description: 'Nombre del producto',
        maxLength: 100,
    })
    @IsNotEmpty({message: 'El nombre del producto es obligatorio'})
    @IsString({message: 'El nombre del producto debe ser una cadena de texto'})
    @Length(2, 100, {message: 'El nombre del producto debe tener entre 2 y 100 caracteres'})
    nombre: string;

    @ApiProperty({
        example: 'Smartphone de última generación con 128GB',
        description: 'Descripción del producto',
        required: false,
    })
    @IsOptional()
    @IsString({message: 'La descripción del producto debe ser una cadena de texto'})
    descripcion?: string;

    @ApiProperty({
        example: 599.99,
        description: 'Precio del producto',
    })
    @IsNotEmpty({message: 'El precio del producto es obligatorio'})
    @IsPositive({message: 'El precio del producto debe ser un número positivo'})
    @IsNumber({}, {message: 'El precio del producto debe ser un número'})
    precio: number;

    @ApiProperty({
        example: 100,
        description: 'Cantidad en stock',
        required: false,
        default: 0,
    })
    @IsOptional()
    @IsNumber({}, {message: 'El stock del producto debe ser un número'})
    @IsPositive({message: 'El stock del producto debe ser un número positivo'})
    @Min(0, {message: 'El stock del producto no puede ser negativo'})
    stock?: number;

    @ApiProperty({
        example: true,
        description: 'Estado del producto (activo/inactivo)',
        required: false,
        default: true,
    })
    @IsOptional()
    @IsBoolean({message: 'El estado del producto debe ser un booleano'})
    activo?: boolean;

    @ApiProperty({
        example: 1,
        description: 'ID de la categoría a la que pertenece el producto',
    })
    @IsNumber({}, {message: 'El ID de la categoría debe ser un número'})
    categoriaId: number;
}
