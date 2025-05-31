export interface PaymentCart {
    id?: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    userId?: string;
}
