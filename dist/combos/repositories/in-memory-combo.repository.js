"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryComboRepository = void 0;
class InMemoryComboRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(c => c.id === id) || null; }
}
exports.InMemoryComboRepository = InMemoryComboRepository;
//# sourceMappingURL=in-memory-combo.repository.js.map