import { Module } from '@nestjs/common';
import { CombosController } from './controllers/combos.controller';
import { CombosService } from './services/combos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaComboRepository } from './repositories/prisma-combo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CombosController],
  providers: [CombosService, { provide: 'ComboRepository', useClass: PrismaComboRepository }],
  exports: [CombosService],
})
export class CombosModule {}
