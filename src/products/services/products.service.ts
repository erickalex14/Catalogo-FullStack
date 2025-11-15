import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
import { CreateProductRequest } from '../dto/create-product.request';
import { UpdateProductRequest } from '../dto/update-product.request';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(@Inject('ProductRepository') private readonly repo: ProductRepositoryContract) {}
  async findAll(): Promise<Product[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Product | null> { return this.repo.findById(id); }
  async create(dto: CreateProductRequest): Promise<Product> {
    const image = Buffer.from(dto.imageBase64, 'base64');
    const price = dto.price !== undefined ? new Prisma.Decimal(dto.price) : null;
    return this.repo.create({ productTypeId: dto.productTypeId, discountId: dto.discountId ?? null, name: dto.name, price, description: dto.description ?? null, image });
  }
  async update(id: number, dto: UpdateProductRequest): Promise<Product> {
    const image = dto.imageBase64 ? Buffer.from(dto.imageBase64, 'base64') : undefined;
    const price = dto.price !== undefined ? new Prisma.Decimal(dto.price) : undefined;
    return this.repo.update(id, { productTypeId: dto.productTypeId, discountId: dto.discountId ?? null, name: dto.name, price: price as any, description: dto.description ?? null, image });
  }
  async delete(id: number): Promise<void> { return this.repo.delete(id); }
}
