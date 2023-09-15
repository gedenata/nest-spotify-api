import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller('v1')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('browse/categories')
  async getSeveralBrowseCategories() {}

  @Get('browse/categories/:category_id')
  async getSingleBrowseCategory() {}
}
