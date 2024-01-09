import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userPhone: string;

  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  userName: string;

  productIds: number[];
}
