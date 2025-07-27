export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
export interface PaginatedUsers {
    data: User[];
    pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    };
}
