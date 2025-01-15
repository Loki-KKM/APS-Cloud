import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('models')
export class ModelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  s3_key: string;

  @Column({ nullable: true })
  forge_urn: string;

  @CreateDateColumn()
  created_at: Date;
}