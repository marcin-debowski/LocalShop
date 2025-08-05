import type { Product } from "./product.types"
import type { User } from "./auth.types"

export interface Order {
    id: string;
    user: User;
    status: "pending" | "shipped" | "delivered";
    createdAt: string;
    updatedAt: string;
    items: {
        product: Product;
        quantity: number;
        price: number;
    }[];
    total: number;
    address: {
        country: string;
        city: string;
        street: string;
        zipCode: string;
    };
}
