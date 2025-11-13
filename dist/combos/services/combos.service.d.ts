import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';
export declare class CombosService {
    private readonly repo;
    constructor(repo: ComboRepositoryContract);
    findAll(): Promise<Combo[]>;
    findById(id: number): Promise<Combo | null>;
}
