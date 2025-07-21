import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
interface UserPayload {
    id: number;
    email: string;
    role: string;
}
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    getMe(req: Request): {
        id: number;
        email: string;
    };
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }, res: Response): Promise<Response<any, Record<string, any>> | {
        message: string;
        username: string;
    }>;
    check(req: Request): UserPayload | undefined;
    getProfile(req: Request): UserPayload | undefined;
    updateProfile(req: Request, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    deleteProfile(req: Request): Promise<void>;
    logout(res: Response): {
        message: string;
    };
}
export {};
