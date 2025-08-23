import { UserRole } from "../user.model";

export interface CreateUserDto {
    email: string;
    role?: UserRole;
}