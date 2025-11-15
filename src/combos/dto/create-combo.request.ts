import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateComboRequest {
  @IsInt()
  productId!: number;

  @IsOptional()
  @IsInt()
  discountId?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;
}
