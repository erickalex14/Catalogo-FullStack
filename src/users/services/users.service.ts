import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepositoryContract,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
