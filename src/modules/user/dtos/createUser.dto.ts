import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  ArrayMinSize
} from 'class-validator';
import { Role } from '../../../shared/enums/role.enum';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  roles: Role[];
}
