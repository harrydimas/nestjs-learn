import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dto/add-product.dto';
import { Product } from './product.entity';
import { EditProductDto } from './dto/edit-product.dto';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() addProductDto: AddProductDto): Promise<Product> {
    return this.productService.create(addProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  edit(@Param('id', ParseIntPipe) id: number, @Body() editProductDto: EditProductDto): Promise<Product> {
    return this.productService.edit(id, editProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
