import { IsEmail, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsInt()
  @IsPositive()
  age!: number;
}

