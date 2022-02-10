import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { OrderDto } from './order.dto';
import { PaginationDto } from './pagination.dto';

export class PaginatedQueryDto extends IntersectionType(PaginationDto, OrderDto) {
  @ApiPropertyOptional({
    description: 'query to filter',
    example: 'Fulaninho'
  })
  @IsString()
  @IsOptional()
  query: string;
}
