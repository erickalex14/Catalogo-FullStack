/**
 * Respuesta de autenticación con token JWT
 */
export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name?: string | null;
  };
}
