import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  id: number;

  survey_id: string;

  create_at: Date;

  expired: boolean;

  url: string;

  save_name: string;
}
