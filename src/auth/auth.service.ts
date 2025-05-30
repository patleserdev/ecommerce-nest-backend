import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: number | string;
  email: string;
  role: string;
  // ajoute d'autres propriétés si nécessaire
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // eslint-disable-line

      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    let role;
    if (user.role == '') {
      role = 'customer';
    } else {
      role = user.role;
    }
    return {
      access_token: this.jwtService.sign(payload),
      role: role,
    };
  }
}
