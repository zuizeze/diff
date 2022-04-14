import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionModule } from './modules/version/version.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    VersionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
