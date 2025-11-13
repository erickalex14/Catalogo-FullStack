import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@Inject('ProductRepository') private readonly repo: ProductRepositoryContract) {}
  async findAll(): Promise<Product[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Product | null> { return this.repo.findById(id); }
}
