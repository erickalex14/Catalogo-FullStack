"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombosService = void 0;
const common_1 = require("@nestjs/common");
let CombosService = class CombosService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() { return this.repo.findAll(); }
    async findById(id) { return this.repo.findById(id); }
    async create(dto) { return this.repo.create({ productId: dto.productId, discountId: dto.discountId ?? null, nombre: dto.nombre }); }
    async update(id, dto) { return this.repo.update(id, { productId: dto.productId, discountId: dto.discountId ?? null, nombre: dto.nombre }); }
    async delete(id) { return this.repo.delete(id); }
};
exports.CombosService = CombosService;
exports.CombosService = CombosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ComboRepository')),
    __metadata("design:paramtypes", [Object])
], CombosService);
//# sourceMappingURL=combos.service.js.map