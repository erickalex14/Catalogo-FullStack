import { Inject, Injectable } from '@nestjs/common';
import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';

@Injectable()
export class ProductTypesService {
  constructor(@Inject('ProductTypeRepository') private readonly repo: ProductTypeRepositoryContract) {}

  async findAll(): Promise<ProductType[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<ProductType | null> { return this.repo.findById(id); }
}
