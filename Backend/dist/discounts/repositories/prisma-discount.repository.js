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
exports.PrismaDiscountRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaDiscountRepository = class PrismaDiscountRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.discount.findMany();
        return rows;
    }
    async findById(id) {
        const row = await this.prisma.discount.findUnique({ where: { id } });
        return row ?? null;
    }
    async create(data) {
        const r = await this.prisma.discount.create({ data });
        return r;
    }
    async update(id, data) {
        const r = await this.prisma.discount.update({ where: { id }, data });
        return r;
    }
    async delete(id) {
        await this.prisma.discount.delete({ where: { id } });
    }
};
exports.PrismaDiscountRepository = PrismaDiscountRepository;
exports.PrismaDiscountRepository = PrismaDiscountRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaDiscountRepository);
//# sourceMappingURL=prisma-discount.repository.js.map