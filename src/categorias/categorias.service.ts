import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private  categoriaRepository: Repository<Categoria>,
    ){}

    async findAll(): Promise<{data: Categoria[], statusCode: number, timestamp: string, path: string}> {
        const categorias = await this.categoriaRepository.find({
            relations: ['productos'],
        })

        return{
            data: categorias,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            path: '/categorias',
        }
    }

    async create (createCategoriaDto: CreateCategoriaDto): Promise<Categoria>{
        try{
            const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
            return await this.categoriaRepository.save(nuevaCategoria);
        } catch(error) {
            if( error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Ya existe una categoria con ese nombre');
            } 
            throw new InternalServerErrorException('Error al crear la categoria');
        }
    }

    async findOne(id: number): Promise<Categoria>{
        const categoria = await this.categoriaRepository.findOne({
            where: {id},
            relations: ['productos'],
        })

        if(!categoria){
            throw new ConflictException('No existe una categoria con ese id');
        }

        return categoria;
    }

    async update (id: number, updateCateoriaDto: UpdateCategoriaDto): Promise<Categoria>{
        const categoria = await this.findOne(id);

        try{
            Object.assign(categoria, updateCateoriaDto)
            return await this.categoriaRepository.save(categoria)
        } catch (error){
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Ya existe una categoria con ese nombre');
            }
            throw new InternalServerErrorException('Error al actualizar la categoria');
        }
    }

    async remove(id: number): Promise<void>{
        const result = await this.categoriaRepository.delete(id);
        
        if(result.affected === 0){
            throw new ConflictException('No existe una categoria con ese id');
        }
    }
}
