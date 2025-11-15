import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateComboRequest {
  @IsOptional()
  @IsInt()
  productId?: number;

  @IsOptional()
  @IsInt()
  discountId?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}
