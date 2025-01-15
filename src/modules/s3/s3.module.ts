import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '../models/entity/model.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([ModelEntity]),
    ],
  
  providers: [S3Service]
})
export class S3Module {}
