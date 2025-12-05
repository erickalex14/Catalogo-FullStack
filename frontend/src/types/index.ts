/**
 * Tipos e interfaces del dominio
 */

// Usuario
export interface User {
  id: number;
  email: string;
  name?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Respuesta de autenticación
export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name?: string | null;
  };
}

// Tipo de Producto
export interface ProductType {
  id: number;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Descuento
export interface Discount {
  id: number;
  porcentaje: number;
  createdAt: string;
  updatedAt: string;
}

// Producto
export interface Product {
  id: number;
  productTypeId: number;
  discountId?: number | null;
  name: string;
  price?: string | null;
  description?: string | null;
  imageBase64: string;
  createdAt: string;
  updatedAt: string;
  productType?: ProductType;
  discount?: Discount;
}

// Combo
export interface Combo {
  id: number;
  productId: number;
  discountId?: number | null;
  nombre: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
  discount?: Discount;
}

// DTOs para crear/actualizar
export interface CreateProductRequest {
  productTypeId: number;
  discountId?: number;
  name: string;
  price?: string;
  description?: string;
  imageBase64: string;
}

export interface UpdateProductRequest {
  productTypeId?: number;
  discountId?: number | null;
  name?: string;
  price?: string;
  description?: string;
  imageBase64?: string;
}

export interface CreateProductTypeRequest {
  name: string;
  description?: string;
}

export interface CreateDiscountRequest {
  porcentaje: number;
}

export interface CreateComboRequest {
  productId: number;
  discountId?: number;
  nombre: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
