import { User } from '../entities/user.entity';

export interface UserRepositoryContract {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
}
