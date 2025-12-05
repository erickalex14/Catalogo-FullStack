import { IsInt, Max, Min } from 'class-validator';

export class CreateDiscountRequest {
  @IsInt()
  @Min(0)
  @Max(100)
  porcentaje!: number;
}
