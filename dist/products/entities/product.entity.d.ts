export interface Product {
    id: number;
    productTypeId: number;
    discountId?: number | null;
    name: string;
    price?: string | null;
    description?: string | null;
    image: Buffer;
    createdAt: Date;
    updatedAt: Date;
}
