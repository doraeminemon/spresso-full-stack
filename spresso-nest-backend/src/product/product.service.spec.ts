import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('productService#create', () => {
    it('should be able to create with valid request', () => {
      const mockFn = jest.fn();
      jest
        .spyOn(prismaService.product, 'create')
        .mockImplementationOnce(mockFn);

      service.create({
        description: 'asd',
        name: 'asd',
        price: 123,
      });

      expect(mockFn).toHaveBeenCalledWith({
        data: { description: 'asd', name: 'asd', price: 123 },
      });
    });
  });
});
