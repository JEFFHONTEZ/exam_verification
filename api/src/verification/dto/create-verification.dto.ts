import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  Matches,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVerificationDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Student ID is required' })
  student_id!: string;

  @IsString()
  @IsNotEmpty({ message: 'Course completed is required' })
  course_completed!: string;

  @Matches(/^\d{6}$/, {
    message: 'date_of_completion must be DDMMYY format — e.g. 230526',
  })
  date_of_completion!: string;

  @IsEmail({}, { message: 'Enter a valid email address' })
  email!: string;

  @Matches(/^\d{4}$/, {
    message: 'total_study_time must be HHMM format — e.g. 0430',
  })
  total_study_time!: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(100)
  final_assessment_score!: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  cpd_hours_completed!: number;

  @IsString()
  @IsNotEmpty({ message: 'Course information is required' })
  course_information!: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        return [value];
      }
    }
    return [];
  })
  @IsArray({ message: 'Modules must be an array' })
  @ArrayMinSize(1, { message: 'At least one module is required' })
  @IsString({ each: true, message: 'Each module must be a string' })
  modules_completed!: string[];
}
