import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Expose } from 'class-transformer';

export class CreateVerificationDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name!: string;

  @Expose({ name: 'studentId' })
  @IsString()
  @IsNotEmpty({ message: 'Student ID is required' })
  student_id!: string;

  @Expose({ name: 'courseCompleted' })
  @IsString()
  @IsNotEmpty({ message: 'Course completed is required' })
  course_completed!: string;

  @Expose({ name: 'dateOfCompletion' })
  @Matches(/^\d{6}$/, {
    message: 'date_of_completion must be DDMMYY format — e.g. 230526',
  })
  date_of_completion!: string;

  @IsEmail({}, { message: 'Enter a valid email address' })
  email!: string;

  @Expose({ name: 'totalStudyTime' })
  @Matches(/^\d{4}$/, {
    message: 'total_study_time must be HHMM format — e.g. 0430',
  })
  total_study_time!: string;

  @Expose({ name: 'finalAssessmentScore' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(100)
  final_assessment_score!: number;

  @Expose({ name: 'cpdHoursCompleted' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  cpd_hours_completed!: number;

  @Expose({ name: 'courseInformation' })
  @IsString()
  @IsNotEmpty({ message: 'Course information is required' })
  course_information!: string;

  @Expose({ name: 'modulesCompleted' })
  @IsString()
  @IsNotEmpty({ message: 'Modules completed is required' })
  modules_completed!: string;
}
