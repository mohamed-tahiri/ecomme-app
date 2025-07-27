export interface Category {
    id: string;
    name: string;
    descripiton: string;
    slug: string;
    subCategories: Category[];
}
