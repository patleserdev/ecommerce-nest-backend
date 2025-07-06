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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtRefreshMiddleware = class JwtRefreshMiddleware {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        const token = req.cookies?.accessToken;
        if (!token)
            return next();
        try {
            const decoded = this.jwtService.decode(token);
            const now = Math.floor(Date.now() / 1000);
            const exp = decoded?.exp;
            const timeLeft = exp - now;
            if (timeLeft < 5 * 60) {
                const newToken = this.jwtService.sign({
                    sub: decoded.sub,
                    email: decoded.email,
                    role: decoded.role,
                }, { expiresIn: '15m' });
                console.log('token rafraîchit');
                res.cookie('accessToken', newToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 15 * 60 * 1000,
                });
            }
        }
        catch (e) {
        }
        next();
    }
};
exports.JwtRefreshMiddleware = JwtRefreshMiddleware;
exports.JwtRefreshMiddleware = JwtRefreshMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtRefreshMiddleware);
//# sourceMappingURL=jwt-refresh.middleware.js.map