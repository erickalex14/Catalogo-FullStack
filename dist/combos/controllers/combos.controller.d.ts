import { CombosService } from '../services/combos.service';
import { CreateComboRequest } from '../dto/create-combo.request';
import { UpdateComboRequest } from '../dto/update-combo.request';
export declare class CombosController {
    private readonly service;
    constructor(service: CombosService);
    list(): Promise<import("../entities/combo.entity").Combo[]>;
    get(id: number): Promise<import("../entities/combo.entity").Combo | null>;
    create(dto: CreateComboRequest): Promise<import("../entities/combo.entity").Combo>;
    update(id: number, dto: UpdateComboRequest): Promise<import("../entities/combo.entity").Combo>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
