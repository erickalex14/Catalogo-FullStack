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
exports.DiscountsController = void 0;
const common_1 = require("@nestjs/common");
const discounts_service_1 = require("../services/discounts.service");
const create_discount_request_1 = require("../dto/create-discount.request");
const update_discount_request_1 = require("../dto/update-discount.request");
let DiscountsController = class DiscountsController {
    constructor(service) {
        this.service = service;
    }
    async list() { return this.service.findAll(); }
    async get(id) { return this.service.findById(Number(id)); }
    async create(dto) { return this.service.create(dto); }
    async update(id, dto) { return this.service.update(Number(id), dto); }
    async remove(id) { await this.service.delete(Number(id)); return { success: true }; }
};
exports.DiscountsController = DiscountsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_request_1.CreateDiscountRequest]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_discount_request_1.UpdateDiscountRequest]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "remove", null);
exports.DiscountsController = DiscountsController = __decorate([
    (0, common_1.Controller)('discounts'),
    __metadata("design:paramtypes", [discounts_service_1.DiscountsService])
], DiscountsController);
//# sourceMappingURL=discounts.controller.js.map