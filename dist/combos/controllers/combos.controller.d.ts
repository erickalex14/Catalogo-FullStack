import { CombosService } from '../services/combos.service';
export declare class CombosController {
    private readonly service;
    constructor(service: CombosService);
    list(): Promise<import("../entities/combo.entity").Combo[]>;
    get(id: number): Promise<import("../entities/combo.entity").Combo | null>;
}
