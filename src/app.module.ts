import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './modules/models/models.module';
import { S3Module } from './modules/s3/s3.module';
import { ForgeModule } from './modules/forge/forge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionModule } from './modules/config/db-config';

@Module({
  imports: [    
    DbConnectionModule,
ModelsModule, S3Module, ForgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
