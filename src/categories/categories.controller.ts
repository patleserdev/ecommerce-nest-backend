import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Ajout catégorie' })
  @ApiBody({ type: CreateCategoryDto })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer les catégories' })
  @ApiBody({ type: CreateCategoryDto })
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer catégorie par id' })
  @ApiBody({ type: CreateCategoryDto })
  findCategoryById(@Param('id') id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @Get('/slug/:slug')
  @ApiOperation({ summary: 'Récupérer catégorie par slug du parent' })
  @ApiQuery({
    name: 'parent',
    required: false,
    description: 'Slug du parent (facultatif)',
  })
  @ApiBody({ type: CreateCategoryDto })
  findCategoryBySlug(
    @Param('slug') slug: string,
    @Query('parent') parentSlug?: string,
  ) {
    // console.log('slug', slug, 'parentSlug', parentSlug);
    return this.categoriesService.findCategoryBySlug(slug, parentSlug);
  }

  @Get('/parent/:id')
  @ApiOperation({ summary: 'Récupérer les catégories enfants ' })
  @ApiBody({ type: CreateCategoryDto })
  findCategoryByParent(@Param('id') id: number) {
    return this.categoriesService.findCategoryByParent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une catégorie' })
  @ApiBody({ type: UpdateCategoryDto })
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  removeCategory(@Param('id') id: number) {
    return this.categoriesService.removeCategory(id);
  }

  // @Post()
  // @ApiOperation({ summary: "Ajout d'une catégorie" })
  // @ApiBody({ type: CreateCategoryDto })
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Récupérer les catégories' })
  // @ApiBody({ type: CreateCategoryDto })
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Récupérer une catégorie' })
  // @ApiBody({ type: CreateCategoryDto })
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Modifier une catégorie' })
  // @ApiBody({ type: UpdateCategoryDto })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Supprimer une catégorie' })
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
