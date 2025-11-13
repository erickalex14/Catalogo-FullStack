"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProductRepository = void 0;
class InMemoryProductRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(p => p.id === id) || null; }
}
exports.InMemoryProductRepository = InMemoryProductRepository;
//# sourceMappingURL=in-memory-product.repository.js.map