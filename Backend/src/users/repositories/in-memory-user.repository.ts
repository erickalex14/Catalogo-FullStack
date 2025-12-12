import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';

export class InMemoryUserRepository implements UserRepositoryContract {
  private items: User[] = [];

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async findById(id: number): Promise<User | null> {
    return this.items.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find(u => u.email === email) || null;
  }

  async create(data: { email: string; password: string; name?: string | null }): Promise<User> {
    const last = this.items.length ? this.items[this.items.length - 1] : undefined;
    const nextId = ((last?.id) ?? 0) + 1;
    const now = new Date();
    const u: User = { id: nextId, email: data.email, password: data.password, name: data.name ?? null, createdAt: now, updatedAt: now };
    this.items.push(u);
    return u;
  }

  async update(id: number, data: { password?: string; name?: string | null }): Promise<User> {
    const idx = this.items.findIndex(u => u.id === id);
    if (idx < 0) throw new Error('Not found');
    const updated: User = { ...this.items[idx], ...data, updatedAt: new Date() };
    this.items[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(u => u.id !== id);
  }
}
