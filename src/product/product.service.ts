import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { AddProductDto } from "./dto/add-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    create(addProductDto: AddProductDto): Promise<Product> {
        const prod = new Product();
        prod.name = addProductDto.name;
        prod.price = addProductDto.price;

        return this.productRepository.save(prod);
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productRepository.findOneByOrFail({ id: id });
    }

    async edit(id: number, editProductDto: EditProductDto): Promise<Product> {
        const prod = await this.findOne(id);
        prod.name = editProductDto.name;
        prod.price = editProductDto.price;
        prod.isActive = editProductDto.isActive;
        return this.productRepository.save(prod);
    }

    async remove(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}
