import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';

export class InMemoryComboRepository implements ComboRepositoryContract {
  private items: Combo[] = [];
  async findAll(): Promise<Combo[]> { return this.items; }
  async findById(id: number): Promise<Combo | null> { return this.items.find(c => c.id === id) || null; }
}
