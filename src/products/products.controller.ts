import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
// import { CreateCategoryDto } from '../categories/dto/create-category.dto';
// import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Product } from '../products/entities/product.entity';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Ajout produit' })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  findAllProducts() {
    return this.productsService.findAllWithMedias();
  }

  @Get(':id')
  @ApiOperation({ summary: 'récupérer un produit' })
  @ApiBody({ type: CreateProductDto })
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById(id);
  }

  @Get('/slug/:slug')
  @ApiOperation({ summary: 'récupérer un produit par son slug' })
  @ApiBody({ type: Product })
  findBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findBySlug(slug);
  }

  @Get('/categories/:id')
  @ApiOperation({ summary: 'récupérer un produit' })
  @ApiBody({ type: CreateProductDto })
  findProductBycategoryId(@Param('id') id: number) {
    return this.productsService.findProductBycategoryId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Ajout produit' })
  @ApiBody({ type: UpdateProductDto })
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer produit' })
  @ApiBody({ type: CreateProductDto })
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  // @Post('categories')
  // @ApiOperation({ summary: 'Ajout catégorie' })
  // @ApiBody({ type: CreateCategoryDto })
  // createCategory(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.productsService.createCategory(createCategoryDto);
  // }

  // @Get('categories')
  // @ApiOperation({ summary: 'Récupérer les catégories' })
  // @ApiBody({ type: CreateCategoryDto })
  // findAllCategories() {
  //   return this.productsService.findAllCategories();
  // }

  // @Get('categories/:id')
  // @ApiOperation({ summary: 'Récupérer catégorie par id' })
  // @ApiBody({ type: CreateCategoryDto })
  // findCategoryById(@Param('id') id: number) {
  //   return this.productsService.findCategoryById(id);
  // }

  // @Patch('categories/:id')
  // @ApiOperation({ summary: 'Modifier une catégorie' })
  // @ApiBody({ type: CreateProductDto })
  // updateCategory(
  //   @Param('id') id: number,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.productsService.updateCategory(id, updateCategoryDto);
  // }

  // @Delete('categories/:id')
  // @ApiOperation({ summary: 'Supprimer une catégorie' })
  // @ApiBody({ type: CreateProductDto })
  // removeCategory(@Param('id') id: number) {
  //   return this.productsService.removeCategory(id);
  // }
}
