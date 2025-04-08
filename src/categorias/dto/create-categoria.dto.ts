import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

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

}