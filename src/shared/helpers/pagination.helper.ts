import { PaginatedQueryDto } from '../dtos/paginatedQuery.dto';
import { PaginatedResponseDto } from '../dtos/paginatedResponse.dto';

export class PaginationHelper {

  static getPagination(params: PaginatedQueryDto) {
    let { size, page } = params;
    const limit = size ? +size : 50;
    const offset = page ? +page * limit : 0;
    return { limit, offset, page: page ? +page : 0 };
  }

  static formatData(data: [any[], number], limit: number, page?: number| string): PaginatedResponseDto {
    const [rows, count] = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    return { totalItems: count, items: rows, totalPages, currentPage };
  }
}
