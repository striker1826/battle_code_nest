import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubOauthGuard } from './strategy/github/github.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GithubOauthGuard)
  @Post('github')
  async githubLogin(@User() user: any) {
    const tokens = await this.authService.githubLogin(user.username);
    return tokens;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@User() user: any) {
    await this.authService.logout(user.id);
    return;
  }
}
