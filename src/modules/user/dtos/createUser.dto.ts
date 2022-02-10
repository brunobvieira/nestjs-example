import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
