import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubOauthGuard } from './strategy/github/github.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GithubOauthGuard)
  @Post('github')
  async githubLogin(@User() user: any) {
    const tokens = await this.authService.githubLogin(user.username);
    return tokens;
  }
}
