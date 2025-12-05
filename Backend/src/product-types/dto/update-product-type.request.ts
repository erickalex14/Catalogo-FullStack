import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductTypeRequest {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;
}
