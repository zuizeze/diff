import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateSurveyDto } from './dto/create-version.dto';
import { UpdateSurveyDto } from './dto/update-version.dto';

@Controller('version')
export class VersionController {
  constructor(private readonly surveyService: VersionService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    const newData = new Date();
    return this.surveyService.create({
      ...createSurveyDto,
      create_at: newData,
    });
  }

  @Get(':survey_id')
  findOne(@Param('survey_id') survey_id: string) {
    console.log('id', survey_id);
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
