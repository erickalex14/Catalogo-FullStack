import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO para la solicitud de login
 */
export class LoginRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
