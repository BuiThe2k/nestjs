import { UserRole } from "../user.model";
export interface Paging {
    page: number;
    pageSize: number;
}
export interface Filter {
    role: UserRole;
}
export type FindAllQuery = Paging & Filter;