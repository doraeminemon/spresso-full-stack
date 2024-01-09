import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const allProducts = await this.prismaService.product.findMany({
      where: {
        id: {
          in: createOrderDto.productIds,
        },
      },
    });
    const relations = createOrderDto.productIds.map((productId) => ({
      productId,
    }));
    const shippingFee = 599;
    const totalPrice =
      allProducts.reduce((prev, curr) => curr.price + prev, 0) + shippingFee;

    return this.prismaService.order.create({
      data: {
        Products_Orders: {
          create: relations,
        },
        totalPrice,
        shippingFee,
        customer: {
          create: {
            email: createOrderDto.userEmail,
            name: createOrderDto.userName,
            phoneNumber: createOrderDto.userPhone,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  findOne(id: string) {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prismaService.order.delete({ where: { id } });
  }
}
