interface Category {
    id: string;
    name: string;
    slug: string;
    subCategories: Category[];
}
