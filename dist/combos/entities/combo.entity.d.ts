export interface Combo {
    id: number;
    productId: number;
    discountId?: number | null;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
}
