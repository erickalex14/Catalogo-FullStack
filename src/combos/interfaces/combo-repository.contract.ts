import { Combo } from '../entities/combo.entity';

export interface ComboRepositoryContract {
  findAll(): Promise<Combo[]>;
  findById(id: number): Promise<Combo | null>;
}
