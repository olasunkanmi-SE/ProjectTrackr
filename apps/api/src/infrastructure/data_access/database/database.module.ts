import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('POSTGRES_HOST'),
        port: config.getOrThrow('POSTGRES_PORT'),
        database: config.getOrThrow('POSTGRES_DB'),
        username: config.getOrThrow('POSTGRES_USER'),
        password: config.getOrThrow('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
