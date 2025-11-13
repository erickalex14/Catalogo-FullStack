"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProductTypeRepository = void 0;
class InMemoryProductTypeRepository {
    constructor() {
        this.items = [];
    }
    async findAll() {
        return this.items;
    }
    async findById(id) {
        return this.items.find(p => p.id === id) || null;
    }
}
exports.InMemoryProductTypeRepository = InMemoryProductTypeRepository;
//# sourceMappingURL=in-memory-product-type.repository.js.map