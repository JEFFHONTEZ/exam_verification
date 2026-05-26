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
import { Transform } from 'class-transformer';

export class UpdateVerificationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  student_id?: string;

  @IsOptional()
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
  @Matches(/^\d{4}$/, {
    message: 'total_study_time must be HHMM format — e.g. 0430',
  })
  total_study_time?: string;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(0)
  @Max(100)
  final_assessment_score?: number;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(0)
  cpd_hours_completed?: number;

  @IsOptional()
  @IsString()
  course_information?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        // If it's a single module name as string, wrap in array
        return [value];
      }
    }
    return [];
  })
  @IsArray({ message: 'Modules must be an array' })
  @ArrayMinSize(1, { message: 'At least one module is required' })
  @IsString({ each: true, message: 'Each module must be a string' })
  modules_completed?: string[];
}
