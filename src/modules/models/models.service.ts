import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from './entity/model.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelEntity)
    private readonly modelRepository: Repository<ModelEntity>,
  ) {}

  create(data: Partial<ModelEntity>) {
    return this.modelRepository.save(data);
  }

  findAll() {
    return this.modelRepository.find();
  }

  findOne(id: number) {
    return this.modelRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<ModelEntity>) {
    return this.modelRepository.update(id, data);
  }
}
