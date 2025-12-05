import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';
import { CreateComboRequest } from '../dto/create-combo.request';
import { UpdateComboRequest } from '../dto/update-combo.request';
export declare class CombosService {
    private readonly repo;
    constructor(repo: ComboRepositoryContract);
    findAll(): Promise<Combo[]>;
    findById(id: number): Promise<Combo | null>;
    create(dto: CreateComboRequest): Promise<Combo>;
    update(id: number, dto: UpdateComboRequest): Promise<Combo>;
    delete(id: number): Promise<void>;
}
