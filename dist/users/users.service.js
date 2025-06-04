"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcryptjs");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const { email, username, password, role } = createUserDto;
        const existingUser = await this.usersRepository.findOne({
            where: { email: email },
        });
        if (existingUser) {
            throw new common_3.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            email,
            username,
            password: hashedPassword,
            role,
        });
        return this.usersRepository.save(user);
    }
    async findOneByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'role', 'username', 'password'],
        });
        if (!user) {
            throw new common_2.NotFoundException('Aucune utilisateur trouvé');
        }
        return user;
    }
    async findOneById(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_2.NotFoundException('Aucune utilisateur trouvé');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const { password, profile } = updateUserDto;
        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : undefined;
        await this.usersRepository.update(id, {
            ...(password && { password: hashedPassword }),
            ...(profile && { profile }),
        });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map