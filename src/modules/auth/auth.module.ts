import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubOauthStrategy } from './strategy/github/github.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { AuthRepository } from './auth.repository';
import { AuthRepositoryImpl } from './auth.repositoryImpl';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { RefreshStrategy } from './strategy/jwt/refresh.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    GithubOauthStrategy,
    JwtStrategy,
    RefreshStrategy,
    JwtService,
  ],
})
export class AuthModule {}
