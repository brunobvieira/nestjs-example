import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  size: number;
}
