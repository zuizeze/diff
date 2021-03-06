import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateSurveyDto } from './dto/create-version.dto';
import { UpdateSurveyDto } from './dto/update-version.dto';

import { create_file } from '../../file';
@Controller('version')
export class VersionController {
  constructor(private readonly surveyService: VersionService) {}

  @Post()
  async create(
    @Body('info') info: CreateSurveyDto,
    @Body('diff') diff: string,
  ) {
    const newData = new Date();
    const file_path = await create_file(diff);
    if (file_path) {
      return this.surveyService.create({
        ...info,
        create_at: newData,
        url: file_path,
      });
    } else {
      throw new NotFoundException(
        'Some Entities not found, no changes applied!',
      );
    }
  }

  @Get(':survey_id')
  findOne(@Param('survey_id') survey_id: string) {
    return this.surveyService.findAllBySurveyId(survey_id);
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateSurveyDto) {
    console.log('id', id);
    return this.surveyService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }

  @Delete()
  batchRemove(@Body('ids') ids: number[]) {
    return this.surveyService.batchRemove(ids);
  }
  // 需要一个传递

  // 写数据加
}
