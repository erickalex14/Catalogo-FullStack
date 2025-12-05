"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor() {
        this.items = [];
    }
    async findAll() {
        return this.items;
    }
    async findById(id) {
        return this.items.find(u => u.id === id) || null;
    }
    async create(data) {
        const last = this.items.length ? this.items[this.items.length - 1] : undefined;
        const nextId = ((last?.id) ?? 0) + 1;
        const now = new Date();
        const u = { id: nextId, email: data.email, password: data.password, name: data.name ?? null, createdAt: now, updatedAt: now };
        this.items.push(u);
        return u;
    }
    async update(id, data) {
        const idx = this.items.findIndex(u => u.id === id);
        if (idx < 0)
            throw new Error('Not found');
        const updated = { ...this.items[idx], ...data, updatedAt: new Date() };
        this.items[idx] = updated;
        return updated;
    }
    async delete(id) {
        this.items = this.items.filter(u => u.id !== id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=in-memory-user.repository.js.map