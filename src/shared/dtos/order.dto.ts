import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OrderDto {
  @ApiPropertyOptional({
    description: 'Column to sort',
    example: 'name'
  })
  @IsString()
  @IsOptional()
  sort: string;

  @ApiPropertyOptional({
    description: 'order to sort',
    example: 'ASC'
  })
  @IsString()
  @IsOptional()
  order: 'ASC' | 'DESC';
}
