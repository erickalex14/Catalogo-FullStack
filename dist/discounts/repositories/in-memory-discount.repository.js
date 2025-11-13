"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDiscountRepository = void 0;
class InMemoryDiscountRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(d => d.id === id) || null; }
}
exports.InMemoryDiscountRepository = InMemoryDiscountRepository;
//# sourceMappingURL=in-memory-discount.repository.js.map