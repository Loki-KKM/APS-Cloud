import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModelEntity } from "../models/entity/model.entity";

  const entities = [ModelEntity]
  @Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env', 
        }),
      TypeOrmModule.forRoot({
        type: process.env.DATABASE as 'mssql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: entities,
        synchronize: true,
        logging: false,
        extra: {
          trustServerCertificate: true,
          connectionTimeoutMillis: 50000,
        },
      }),
      TypeOrmModule.forFeature(entities)
    ],
    exports: [TypeOrmModule]
  })
  export class DbConnectionModule { }
  