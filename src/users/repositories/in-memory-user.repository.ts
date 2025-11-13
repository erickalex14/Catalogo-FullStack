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
}
