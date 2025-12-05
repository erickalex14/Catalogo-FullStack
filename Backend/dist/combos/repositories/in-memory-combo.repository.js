"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryComboRepository = void 0;
class InMemoryComboRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(c => c.id === id) || null; }
    async create(data) {
        const last = this.items.length ? this.items[this.items.length - 1] : undefined;
        const nextId = ((last?.id) ?? 0) + 1;
        const now = new Date();
        const item = { id: nextId, productId: data.productId, discountId: data.discountId ?? null, nombre: data.nombre, createdAt: now, updatedAt: now };
        this.items.push(item);
        return item;
    }
    async update(id, data) {
        const idx = this.items.findIndex(c => c.id === id);
        if (idx < 0)
            throw new Error('Not found');
        const updated = { ...this.items[idx], ...data, updatedAt: new Date() };
        this.items[idx] = updated;
        return updated;
    }
    async delete(id) {
        this.items = this.items.filter(c => c.id !== id);
    }
}
exports.InMemoryComboRepository = InMemoryComboRepository;
//# sourceMappingURL=in-memory-combo.repository.js.map