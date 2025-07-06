import { Module, forwardRef, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshMiddleware } from './middleware/jwt-refresh.middleware';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule, // ← ajoute ConfigModule ici
    JwtModule.registerAsync({
      imports: [ConfigModule], // ← pour que ConfigService soit injecté
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtRefreshMiddleware).forRoutes('*'); // 🔁 Toutes les routes
  }
}
