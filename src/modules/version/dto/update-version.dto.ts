import { PartialType } from '@nestjs/swagger';
import { CreateSurveyDto } from './create-version.dto';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {}
