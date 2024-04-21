import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubOauthStrategy } from './strategy/github/github.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GithubOauthStrategy],
})
export class AuthModule {}
