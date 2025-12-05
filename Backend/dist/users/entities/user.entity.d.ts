export interface User {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
