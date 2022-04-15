import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionEntity } from './entities/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VersionEntity])],
  controllers: [VersionController],
  providers: [VersionService],
})
export class VersionModule {}
