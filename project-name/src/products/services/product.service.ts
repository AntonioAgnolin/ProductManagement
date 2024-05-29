import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductNotFoundException } from '../exceptions/product-not-found.exception';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      throw new ProductNotFoundException();
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const removedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!removedProduct) {
      throw new ProductNotFoundException();
    }
    return removedProduct;
  }
}
