import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: number): Promise<void>;
}
