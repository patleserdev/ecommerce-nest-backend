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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const update_user_dto_1 = require("../users/dto/update-user.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const auth_service_1 = require("../auth/auth.service");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
let UsersController = class UsersController {
    usersService;
    authService;
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    getMe(req) {
        const user = req.user;
        return {
            id: user.id,
            email: user.email,
        };
    }
    async register(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async login(body, res) {
        try {
            const { email, password } = body;
            const loginResult = await this.authService.login(email, password);
            const token = loginResult.access_token;
            const role = loginResult.role;
            const username = loginResult.username;
            res.cookie('oeb-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                path: '/',
            });
            res.cookie('role', role, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                path: '/',
            });
            return { message: 'Connexion réussie', username: username };
        }
        catch (error) {
            console.error('Erreur de connexion:', error);
            return res
                .status(401)
                .json({ message: 'Email ou mot de passe incorrect' });
        }
    }
    getProfile(req) {
        return req.user;
    }
    async updateProfile(req, updateUserDto) {
        const user = req.user;
        if (!user) {
            throw new common_2.UnauthorizedException('Utilisateur cible non trouvé');
        }
        let targetUserId = user.id;
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            if (user.role !== 'admin') {
                throw new common_3.ForbiddenException('Vous ne pouvez modifier que votre propre profil');
            }
            const targetUser = await this.usersService.findOneByEmail(updateUserDto.email);
            if (!targetUser) {
                throw new common_1.NotFoundException('Utilisateur cible non trouvé');
            }
            targetUserId = targetUser.id;
        }
        await this.usersService.update(targetUserId, updateUserDto);
        return this.usersService.findOneById(targetUserId);
    }
    async deleteProfile(req) {
        const user = req.user;
        if (!user) {
            throw new common_2.UnauthorizedException('Utilisateur cible non trouvé');
        }
        if (user.role !== 'admin') {
            throw new common_3.ForbiddenException('Accès réservé aux administrateurs');
        }
        await this.usersService.remove(user.id);
    }
    logout(res) {
        res.clearCookie('oeb-token', { path: '/' });
        res.clearCookie('role', { path: '/' });
        return { message: 'Déconnexion OK' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Inscription utilisateur' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Connexion utilisateur' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_4.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la photo de profil' }),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier le profil' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Suppression utilisateur' }),
    (0, common_1.Delete)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Déconnexion' }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_4.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map