import {
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  Matches,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Transform, Expose } from 'class-transformer';

export class UpdateVerificationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Expose({ name: 'studentId' })
  @IsString()
  student_id?: string;

  @IsOptional()
  @Expose({ name: 'courseCompleted' })
  @IsString()
  course_completed?: string;

  @IsOptional()
  @Matches(/^\d{6}$/, {
    message: 'date_of_completion must be DDMMYY format — e.g. 230526',
  })
  date_of_completion?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email address' })
  email?: string;

  @IsOptional()
  @Expose({ name: 'totalStudyTime' })
  @Matches(/^\d{4}$/, {
    message: 'total_study_time must be HHMM format — e.g. 0430',
  })
  total_study_time?: string;

  @IsOptional()
  @Expose({ name: 'finalAssessmentScore' })
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(0)
  @Max(100)
  final_assessment_score?: number;

  @IsOptional()
  @Expose({ name: 'cpdHoursCompleted' })
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(0)
  cpd_hours_completed?: number;

  @IsOptional()
  @Expose({ name: 'courseInformation' })
  @IsString()
  course_information?: string;

  @IsOptional()
  @Expose({ name: 'modulesCompleted' })
  @IsArray({ message: 'Modules must be an array' })
  @ArrayMinSize(1, { message: 'At least one module is required' })
  @IsString({ each: true, message: 'Each module must be a string' })
  modules_completed?: string[];
}
