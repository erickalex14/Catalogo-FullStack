import { Inject, Injectable } from '@nestjs/common';
import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';

@Injectable()
export class CombosService {
  constructor(@Inject('ComboRepository') private readonly repo: ComboRepositoryContract) {}
  async findAll(): Promise<Combo[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Combo | null> { return this.repo.findById(id); }
}
