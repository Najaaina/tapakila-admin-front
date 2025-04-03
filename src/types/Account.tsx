import { Role } from './Role.ts';

export type Account = {
    id_account: string;
    name: string;
    email: string;
    account_creation_date: string;
    role: Role;
};
