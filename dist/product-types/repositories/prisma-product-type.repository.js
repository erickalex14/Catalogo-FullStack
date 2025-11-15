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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaProductTypeRepository = class PrismaProductTypeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.productType.findMany();
        return rows;
    }
    async findById(id) {
        const row = await this.prisma.productType.findUnique({ where: { id } });
        return row ?? null;
    }
    async create(data) {
        const r = await this.prisma.productType.create({ data });
        return r;
    }
    async update(id, data) {
        const r = await this.prisma.productType.update({ where: { id }, data });
        return r;
    }
    async delete(id) {
        await this.prisma.productType.delete({ where: { id } });
    }
};
exports.PrismaProductTypeRepository = PrismaProductTypeRepository;
exports.PrismaProductTypeRepository = PrismaProductTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductTypeRepository);
//# sourceMappingURL=prisma-product-type.repository.js.map