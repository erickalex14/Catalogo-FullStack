"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProductRepository = void 0;
class InMemoryProductRepository {
    constructor() {
        this.items = [];
    }
    async findAll() { return this.items; }
    async findById(id) { return this.items.find(p => p.id === id) || null; }
    async create(data) {
        const last = this.items.length ? this.items[this.items.length - 1] : undefined;
        const nextId = ((last?.id) ?? 0) + 1;
        const now = new Date();
        const item = { id: nextId, productTypeId: data.productTypeId, discountId: data.discountId ?? null, name: data.name, price: data.price ?? null, description: data.description ?? null, image: data.image, createdAt: now, updatedAt: now };
        this.items.push(item);
        return item;
    }
    async update(id, data) {
        const idx = this.items.findIndex(p => p.id === id);
        if (idx < 0)
            throw new Error('Not found');
        const updated = { ...this.items[idx], ...data, updatedAt: new Date() };
        this.items[idx] = updated;
        return updated;
    }
    async delete(id) {
        this.items = this.items.filter(p => p.id !== id);
    }
}
exports.InMemoryProductRepository = InMemoryProductRepository;
//# sourceMappingURL=in-memory-product.repository.js.map