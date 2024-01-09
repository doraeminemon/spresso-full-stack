import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('orderService#create', () => {
    it('should be able to create with valid request', async () => {
      const mockFn = jest.fn();
      jest.spyOn(prismaService.order, 'create').mockImplementationOnce(mockFn);
      jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce([
        {
          id: 123,
          name: 'asd',
          description: '',
          price: 123,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await service.create({
        productIds: [1, 2, 3],
        userEmail: 'email',
        userName: 'name',
        userPhone: 'phone',
      });

      expect(mockFn).toHaveBeenCalledWith({
        data: {
          Products_Orders: {
            create: [{ productId: 1 }, { productId: 2 }, { productId: 3 }],
          },
          customer: {
            create: {
              email: 'email',
              name: 'name',
              phoneNumber: 'phone',
            },
          },
          shippingFee: 599,
          totalPrice: 722,
        },
      });
    });
  });
});
