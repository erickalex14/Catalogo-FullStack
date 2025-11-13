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
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=in-memory-user.repository.js.map