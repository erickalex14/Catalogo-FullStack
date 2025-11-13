import { Module } from '@nestjs/common';
import { CombosController } from './controllers/combos.controller';
import { CombosService } from './services/combos.service';
import { InMemoryComboRepository } from './repositories/in-memory-combo.repository';

@Module({
  controllers: [CombosController],
  providers: [CombosService, { provide: 'ComboRepository', useClass: InMemoryComboRepository }],
  exports: [CombosService],
})
export class CombosModule {}
