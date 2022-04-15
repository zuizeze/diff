import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto as CreateVersionDto } from './dto/create-version.dto';
import { UpdateSurveyDto } from './dto/update-version.dto';
import { VersionEntity } from './entities/version.entity';

@Injectable()
export class VersionService {
  @InjectRepository(VersionEntity)
  private readonly versionRepository: Repository<VersionEntity>;

  // 创建一个版本
  async create(createVersionDto: CreateVersionDto) {
    const newVersion = await this.versionRepository.create(createVersionDto);
    const res = await this.versionRepository.save(newVersion);
    return res;
  }

  async findAll() {
    return await this.versionRepository.find();
  }

  async findAllBySurveyId(survey_id: string) {
    return await this.versionRepository.find({
      where: { survey_id },
    });
  }

  /**
   * 根据id查询用户
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const version = await this.versionRepository.findOne(id, {
      // select: ['user_name', 'user_email'],
      withDeleted: false,
    });
    if (!version) {
      throw new HttpException(`没有找到该版本`, HttpStatus.FORBIDDEN);
    }
    return version;
  }
  /**
   * 根据id更新用户
   * @param id
   * @returns
   */
  update(id: number, updateUserDto: UpdateSurveyDto) {
    return this.versionRepository.update(+id, updateUserDto);
  }

  remove(id: number) {
    return this.versionRepository.softDelete(+id);
  }

  /**
   * 批量删除
   * @param ids
   * @returns
   */
  async batchRemove(ids: number[]) {
    const entities = await this.versionRepository.findByIds(ids);
    console.log(entities);
    if (!entities) {
      throw new NotFoundException(
        'Some Entities not found, no changes applied!',
      );
    }
    return this.versionRepository.softRemove(entities);
  }
}
