import {
    Controller,
    Post,
    Get,
    Param,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { S3Service } from '../s3/s3.service';
  import { ModelsService } from './models.service';
  import { ForgeService } from '../forge/forge.service';
  
  @Controller('models')
  export class ModelsController {
    constructor(
      private readonly modelsService: ModelsService,
      private readonly s3Service: S3Service,
      private readonly forgeService: ForgeService,
    ) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadModel(@UploadedFile() file: Express.Multer.File) {
      if (!file) throw new BadRequestException('No file uploaded');
  
      // Upload file to S3
      const s3Key = await this.s3Service.uploadFile(file);
  
      // Save metadata in the database
      const model = await this.modelsService.create({
        filename: file.originalname,
        s3_key: s3Key,
      });
  
      // Initiate translation in Forge
      const forgeUrn = await this.forgeService.translateFile(s3Key);
      await this.modelsService.update(model.id, { forge_urn: forgeUrn });
  
      return { id: model.id, forgeUrn };
    }
  
    @Get()
    async listModels() {
      return this.modelsService.findAll();
    }
  
    @Get(':id')
    async getModel(@Param('id') id: number) {
      return this.modelsService.findOne(id);
    }
  }
  