import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoria' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({
    status: 201,
    description: 'Categoria creada exitosamente',
    type: Categoria,
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoria con ese nombre',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos invalidos'
  })
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias',
    schema: {
      type: 'object',
      properties:{
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Categoria' }
        },
        statusCode: {
          type: 'number',
          example: 200
        },
        timestamp: {type: 'string', format: 'date-time'},
        path: { type: 'string', example: '/categorias' }
      }
    }
  })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: Categoria,
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoria con ese id',
  })
  findeOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoria por id' })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({
    status: 200,
    description: 'Categoria actualizada exitosamente',
    type: Categoria,
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoria con ese id',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoria con ese nombre',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos invalidos'
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una categoria por id' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoria a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: 204,
    description: 'Categoria eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoria con ese id',
  })
  @ApiResponse({
    status: 409,
    description: 'No se puede eliminar la categoria porque tiene productos asociados',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }

}
