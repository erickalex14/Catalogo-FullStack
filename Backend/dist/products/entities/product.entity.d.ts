import { Prisma } from '@prisma/client';
export interface Product {
    id: number;
    productTypeId: number;
    discountId?: number | null;
    name: string;
    price?: Prisma.Decimal | null;
    description?: string | null;
    image: Buffer;
    createdAt: Date;
    updatedAt: Date;
}
