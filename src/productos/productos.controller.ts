import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import path from 'path';
import { timestamp } from 'rxjs';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductoDto})
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    type: Producto,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos'})
  @ApiResponse({ status: 404, description: 'Categoria no encontrada'})
  create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiQuery({
    name: 'categoriaId',
    required: false,
    description: 'Filtrar productos por categoria',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Producto' },
        },
        statusCode: {
          type: 'number',
          example: 200,
        },
        timestamp: { type: 'string', format: 'date-time' },
        path: { type: 'string', example: '/productos' },
      }
    }
  })
  async findAll(@Query('categoriaId') categoriaId?: number) {
    if (categoriaId){
      const productos = await this.productosService.findByCategoria(+categoriaId);
      return {
        data: productos,
        statusCode: 200,
        timestamp: new Date().toISOString(),
        path: `/producto?categoriaId=${categoriaId}`,
      }
    }
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por id' })
  @ApiParam({ name: 'id', description: 'ID del producto'})
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    type: Producto,
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con ese id',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return this.productosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por id' })
  @ApiParam({ name: 'id', description: 'ID del producto'})
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    type: Producto,
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con ese id',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos invalidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto : UpdateProductoDto,
  ): Promise<Producto> {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto por id' })
  @ApiParam({ name: 'id', description: 'ID del producto'})
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con ese id',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productosService.remove(id);
  }
}
