import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateDiscountRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  porcentaje?: number;
}
