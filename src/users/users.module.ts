import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, { provide: 'UserRepository', useClass: PrismaUserRepository }],
  exports: [UsersService],
})
export class UsersModule {}
