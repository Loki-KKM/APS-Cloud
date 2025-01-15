import { Module } from '@nestjs/common';
import { ForgeService } from './forge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '../models/entity/model.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([ModelEntity]),
    ],
  
  providers: [ForgeService]
})
export class ForgeModule {}
