import { Inject, Injectable } from '@nestjs/common';
import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';
import { CreateProductTypeRequest } from '../dto/create-product-type.request';
import { UpdateProductTypeRequest } from '../dto/update-product-type.request';

@Injectable()
export class ProductTypesService {
  constructor(@Inject('ProductTypeRepository') private readonly repo: ProductTypeRepositoryContract) {}

  async findAll(): Promise<ProductType[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<ProductType | null> { return this.repo.findById(id); }
  async create(dto: CreateProductTypeRequest): Promise<ProductType> { return this.repo.create({ name: dto.name, description: dto.description ?? null }); }
  async update(id: number, dto: UpdateProductTypeRequest): Promise<ProductType> { return this.repo.update(id, { name: dto.name, description: dto.description ?? null }); }
  async delete(id: number): Promise<void> { return this.repo.delete(id); }
}
