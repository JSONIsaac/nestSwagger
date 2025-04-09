import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { timestamp } from 'rxjs';
import path from 'path';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    private categoriasService: CategoriasService,
  ){}

  async create(createProductoDto : CreateProductoDto): Promise<Producto>{
    try{
      const categoria = await this.categoriasService.findOne(createProductoDto.categoriaId);

      const nuevoProducto = this.productoRepository.create({
        ...createProductoDto,
        categoria,
      })
      return await this.productoRepository.save(nuevoProducto);
    } catch(error) {
      if (error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll(): Promise<{data: Producto[], statusCode: number, timestamp: string, path: string}> {
    const productos = await this.productoRepository.find({
      relations: ['categoria'],
    })
    return{
      data: productos,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: '/productos',
    }
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    })

    if (!producto){
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
    
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);

    try{
      // Si se esta actualizando la categoria, verificar que exista

      if (updateProductoDto.categoriaId){
        const categoria = await this.categoriasService.findOne(updateProductoDto.categoriaId);
        producto.categoria = categoria
      }

      // Actaulizar los demas campos
      Object.keys(updateProductoDto).forEach((key => {
        if (key !== 'categoriaId'){
          producto[key] = updateProductoDto[key];
        }
      }));
      return await this.productoRepository.save(producto);
    } catch (error){
      if (error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
    
  }

  async remove(id: number): Promise<void> {
    const result = await this.productoRepository.delete(id);

    if (result.affected === 0){
      throw new NotFoundException(`No existe un producto con ID ${id}`);
    }
  }

    async findByCategoria(categoriaId: number): Promise<Producto[]> {
      // verificar que la categoria existe

      await this.categoriasService.findOne(categoriaId);

      return this.productoRepository.find({
        where: { categoria: { id: categoriaId } },
        relations: ['categoria'],
      })
    
  }
}
