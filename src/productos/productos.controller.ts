import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import path from 'path';

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
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
