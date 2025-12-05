/**
 * Servicios para interactuar con la API del Backend
 */

import api from './api';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  Product,
  ProductType,
  Discount,
  Combo,
  CreateProductRequest,
  UpdateProductRequest,
  CreateProductTypeRequest,
  CreateDiscountRequest,
  CreateComboRequest,
} from '@/types';

/**
 * Servicio de Autenticación
 */
export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    api.setToken(response.accessToken);
    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    api.setToken(response.accessToken);
    return response;
  },

  async getProfile(): Promise<User> {
    return api.get<User>('/auth/profile');
  },

  logout() {
    api.clearToken();
  },
};

/**
 * Servicio de Productos
 */
export const productsService = {
  async getAll(): Promise<Product[]> {
    return api.get<Product[]>('/products');
  },

  async getById(id: number): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  async create(data: CreateProductRequest): Promise<Product> {
    return api.post<Product>('/products', data);
  },

  async update(id: number, data: UpdateProductRequest): Promise<Product> {
    return api.patch<Product>(`/products/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

/**
 * Servicio de Tipos de Producto
 */
export const productTypesService = {
  async getAll(): Promise<ProductType[]> {
    return api.get<ProductType[]>('/product-types');
  },

  async getById(id: number): Promise<ProductType> {
    return api.get<ProductType>(`/product-types/${id}`);
  },

  async create(data: CreateProductTypeRequest): Promise<ProductType> {
    return api.post<ProductType>('/product-types', data);
  },

  async update(id: number, data: Partial<CreateProductTypeRequest>): Promise<ProductType> {
    return api.patch<ProductType>(`/product-types/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/product-types/${id}`);
  },
};

/**
 * Servicio de Descuentos
 */
export const discountsService = {
  async getAll(): Promise<Discount[]> {
    return api.get<Discount[]>('/discounts');
  },

  async getById(id: number): Promise<Discount> {
    return api.get<Discount>(`/discounts/${id}`);
  },

  async create(data: CreateDiscountRequest): Promise<Discount> {
    return api.post<Discount>('/discounts', data);
  },

  async update(id: number, data: Partial<CreateDiscountRequest>): Promise<Discount> {
    return api.patch<Discount>(`/discounts/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/discounts/${id}`);
  },
};

/**
 * Servicio de Combos
 */
export const combosService = {
  async getAll(): Promise<Combo[]> {
    return api.get<Combo[]>('/combos');
  },

  async getById(id: number): Promise<Combo> {
    return api.get<Combo>(`/combos/${id}`);
  },

  async create(data: CreateComboRequest): Promise<Combo> {
    return api.post<Combo>('/combos', data);
  },

  async update(id: number, data: Partial<CreateComboRequest>): Promise<Combo> {
    return api.patch<Combo>(`/combos/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/combos/${id}`);
  },
};

/**
 * Servicio de Usuarios
 */
export const usersService = {
  async getAll(): Promise<User[]> {
    return api.get<User[]>('/users');
  },

  async getById(id: number): Promise<User> {
    return api.get<User>(`/users/${id}`);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
