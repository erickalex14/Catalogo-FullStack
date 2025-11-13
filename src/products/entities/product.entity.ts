export interface Product {
  id: number;
  productTypeId: number;
  discountId?: number | null;
  name: string;
  price?: string | null; // placeholder; considerar Decimal back-end
  description?: string | null;
  image: Buffer; // Bytes en prisma
  createdAt: Date;
  updatedAt: Date;
}
