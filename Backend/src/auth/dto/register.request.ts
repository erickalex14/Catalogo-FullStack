import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * DTO para la solicitud de registro
 */
export class RegisterRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
