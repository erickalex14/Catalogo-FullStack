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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() { return this.repo.findAll(); }
    async findById(id) { return this.repo.findById(id); }
    async create(dto) {
        const image = Buffer.from(dto.imageBase64, 'base64');
        const price = dto.price !== undefined ? new client_1.Prisma.Decimal(dto.price) : null;
        return this.repo.create({ productTypeId: dto.productTypeId, discountId: dto.discountId ?? null, name: dto.name, price, description: dto.description ?? null, image });
    }
    async update(id, dto) {
        const image = dto.imageBase64 ? Buffer.from(dto.imageBase64, 'base64') : undefined;
        const price = dto.price !== undefined ? new client_1.Prisma.Decimal(dto.price) : undefined;
        return this.repo.update(id, { productTypeId: dto.productTypeId, discountId: dto.discountId ?? null, name: dto.name, price: price, description: dto.description ?? null, image });
    }
    async delete(id) { return this.repo.delete(id); }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProductRepository')),
    __metadata("design:paramtypes", [Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map