export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    store: {
        slug: string;
        name: string;
        description: string;
    };
    vendor: {
        name: string;
        email: string;
    };
    Category: {
        name: string;
        descripiton: string;
    };
}
