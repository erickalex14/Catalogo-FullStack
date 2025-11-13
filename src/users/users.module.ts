import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, { provide: 'UserRepository', useClass: InMemoryUserRepository }],
  exports: [UsersService],
})
export class UsersModule {}
