import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
interface User {
    id: number | string;
    email: string;
    role: string;
    username: string;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        role: string;
        username: string;
    }>;
}
export {};
