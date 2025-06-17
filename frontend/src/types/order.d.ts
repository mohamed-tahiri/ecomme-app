// src/types/order.ts
export interface Order {
    id: string;
    status: 'pending' | 'shipped' | 'delivered' | 'canceled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    total: number;
    userId: string;
    addressId?: string | null;
    paymentCartId?: string | null;
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
