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
exports.PrismaProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaProductRepository = class PrismaProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.product.findMany();
        return rows.map((r) => ({
            ...r,
            price: r.price,
            image: r.image,
        }));
    }
    async findById(id) {
        const r = await this.prisma.product.findUnique({ where: { id } });
        if (!r)
            return null;
        return ({
            ...r,
            price: r.price,
            image: r.image,
        });
    }
    async create(data) {
        const created = await this.prisma.product.create({
            data: {
                productTypeId: data.productTypeId,
                discountId: data.discountId ?? null,
                name: data.name,
                price: data.price ?? null,
                description: data.description ?? null,
                image: data.image,
            },
        });
        return {
            ...created,
            price: created.price,
            image: created.image,
        };
    }
    async update(id, data) {
        const updated = await this.prisma.product.update({
            where: { id },
            data: {
                productTypeId: data.productTypeId,
                discountId: data.discountId,
                name: data.name,
                price: data.price ?? undefined,
                description: data.description,
                image: data.image,
            },
        });
        return {
            ...updated,
            price: updated.price,
            image: updated.image,
        };
    }
    async delete(id) {
        await this.prisma.product.delete({ where: { id } });
    }
};
exports.PrismaProductRepository = PrismaProductRepository;
exports.PrismaProductRepository = PrismaProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductRepository);
//# sourceMappingURL=prisma-product.repository.js.map