import { Combo } from '../entities/combo.entity';

export interface ComboRepositoryContract {
  findAll(): Promise<Combo[]>;
  findById(id: number): Promise<Combo | null>;
  create(data: { productId: number; discountId?: number | null; nombre: string }): Promise<Combo>;
  update(id: number, data: { productId?: number; discountId?: number | null; nombre?: string }): Promise<Combo>;
  delete(id: number): Promise<void>;
}
