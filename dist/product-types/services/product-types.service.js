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
exports.ProductTypesService = void 0;
const common_1 = require("@nestjs/common");
let ProductTypesService = class ProductTypesService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() { return this.repo.findAll(); }
    async findById(id) { return this.repo.findById(id); }
};
exports.ProductTypesService = ProductTypesService;
exports.ProductTypesService = ProductTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProductTypeRepository')),
    __metadata("design:paramtypes", [Object])
], ProductTypesService);
//# sourceMappingURL=product-types.service.js.map