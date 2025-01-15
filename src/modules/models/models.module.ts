import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entity/model.entity';
import { S3Service } from '../s3/s3.service';
import { ForgeService } from '../forge/forge.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModelEntity]),
  ],

  controllers: [ModelsController],
  providers: [ModelsService,S3Service,ForgeService]
})
export class ModelsModule {}
