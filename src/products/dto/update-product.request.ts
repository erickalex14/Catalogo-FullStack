import { IsInt, IsOptional, IsString, MaxLength, IsDecimal } from 'class-validator';

export class UpdateProductRequest {
  @IsOptional()
  @IsInt()
  productTypeId?: number;

  @IsOptional()
  @IsInt()
  discountId?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsDecimal()
  price?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;

  @IsOptional()
  @IsString()
  imageBase64?: string; // para actualizar imagen
}
