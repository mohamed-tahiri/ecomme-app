import { Address } from './address';
import { User } from './user';

// src/types/order.ts
export interface Order {
    id: string;
    reference: string;
    status: 'pending' | 'shipped' | 'delivered' | 'canceled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    total: number;
    userId: string;
    user?: User;
    addressId?: string | null;
    address: Address;
    paymentCartId?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItems {
    id: string;
    quantity: number;
    product: Product;
    productId: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderCreationPayload {
    userId: string;
    cartItems: { productId: string; quantity: number }[];
    addressId?: string | null;
    paymentCartId?: string | null;
    paymentMethod: 'card' | 'cod';
}

export interface OrderGetById {
    order: Order;
    items: OrderItems[];
}

export interface OrderWithItems {
    id: string;
    reference: string;
    status: 'pending' | 'shipped' | 'delivered' | 'canceled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    total: number;
    userId: string;
    user?: User;
    addressId?: string | null;
    address: Address;
    items: OrderItems[];
    paymentCartId?: string | null;
    createdAt: string;
    updatedAt: string;
}
