import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    await this.prismaService.product.create({
      data: {
        ...createProductDto,
      },
    });
    return;
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
      },
    });
    return;
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
