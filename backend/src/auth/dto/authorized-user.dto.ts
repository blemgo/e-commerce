import { Role } from "src/users/entities/enums/role.enum";

export class AuthorizedUser {
    id: string;
    email: string;
    fullName: string;
    role: Role;
}