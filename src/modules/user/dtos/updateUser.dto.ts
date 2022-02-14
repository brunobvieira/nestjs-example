import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  ValidateIf,
  IsArray,
  ArrayMinSize
} from 'class-validator';
import { Match } from '../../../shared/decorators/match.decorator';
import { Role } from '../../../shared/enums/role.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(8)
  @IsString()
  password?: string;

  @ApiProperty()
  @ValidateIf((o) => o.password)
  @Match('password')
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  passwordCOnfirmation?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  roles: Role[];
}
