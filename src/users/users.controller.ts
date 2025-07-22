import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ForbiddenException } from '@nestjs/common';
import { Response } from 'express';
import { Res } from '@nestjs/common';

interface UserPayload {
  id: number;
  email: string;
  role: string;
  // autres propriétés utiles ici...
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    // req.user est défini par JwtStrategy.validate()
    // const user = req.user as UserPayload;

    return req.user as UserPayload | undefined;
  }

  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { email, password } = body;
      const loginResult = await this.authService.login(email, password);

      const token = loginResult.access_token;
      const role = loginResult.role;
      const username = loginResult.username;
      const isProd = process.env.VERCEL == '1'; // ou ta propre variable d'env
      // console.log('isprod', isProd);
      // Envoie le token dans un cookie HttpOnly
      res.cookie('oeb-token', token, {
        httpOnly: true,
        secure: isProd, // true en prod (HTTPS)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        // sameSite: 'lax',
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });
      res.cookie('role', role, {
        httpOnly: true,
        secure: isProd, // true en prod (HTTPS)
        // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        maxAge: 24 * 60 * 60 * 1000, // ✅ 1 jour
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });

      return { message: 'Connexion réussie', username: username };
    } catch (error) {
      // console.error('Erreur de connexion:', error);
      // return res
      //   .status(401)
      //   .json({ message: 'Email ou mot de passe incorrect' });
      console.error('Erreur de connexion:', error);
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  check(@Req() req: Request) {
    // Si on arrive ici, le token est valide
    return req.user as UserPayload | undefined;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer la photo de profil' })
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user as UserPayload | undefined;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Modifier le profil' })
  @ApiBody({ type: UpdateUserDto })
  @Patch('profile')
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = req.user as UserPayload;

    if (!user) {
      throw new UnauthorizedException('Utilisateur cible non trouvé');
    }

    let targetUserId = user.id;

    // Si l'utilisateur essaie de modifier quelqu'un d'autre
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      if (user.role !== 'admin') {
        throw new ForbiddenException(
          'Vous ne pouvez modifier que votre propre profil',
        );
      }

      const targetUser = await this.usersService.findOneByEmail(
        updateUserDto.email,
      );
      if (!targetUser) {
        throw new NotFoundException('Utilisateur cible non trouvé');
      }

      targetUserId = targetUser.id;
    }

    await this.usersService.update(targetUserId, updateUserDto);
    return this.usersService.findOneById(targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Suppression utilisateur' })
  @Delete('profile')
  async deleteProfile(@Req() req: Request) {
    const user = req.user as UserPayload | undefined;
    if (!user) {
      throw new UnauthorizedException('Utilisateur cible non trouvé');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    await this.usersService.remove(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Déconnexion' })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    // Supprimer les cookies
    res.clearCookie('oeb-token', { path: '/' });
    res.clearCookie('role', { path: '/' });

    return { message: 'Déconnexion OK' };
  }
}
