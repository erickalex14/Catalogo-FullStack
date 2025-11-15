"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDiscountRepository = void 0;
class InMemoryDiscountRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(d => d.id === id) || null; }
    async create(data) {
        const last = this.items.length ? this.items[this.items.length - 1] : undefined;
        const nextId = ((last?.id) ?? 0) + 1;
        const now = new Date();
        const item = { id: nextId, porcentaje: data.porcentaje, createdAt: now, updatedAt: now };
        this.items.push(item);
        return item;
    }
    async update(id, data) {
        const idx = this.items.findIndex(d => d.id === id);
        if (idx < 0)
            throw new Error('Not found');
        const updated = { ...this.items[idx], ...data, updatedAt: new Date() };
        this.items[idx] = updated;
        return updated;
    }
    async delete(id) {
        this.items = this.items.filter(d => d.id !== id);
    }
}
exports.InMemoryDiscountRepository = InMemoryDiscountRepository;
//# sourceMappingURL=in-memory-discount.repository.js.map