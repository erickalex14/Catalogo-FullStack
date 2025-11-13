import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';
export declare class InMemoryComboRepository implements ComboRepositoryContract {
    private items;
    findAll(): Promise<Combo[]>;
    findById(id: number): Promise<Combo | null>;
}
