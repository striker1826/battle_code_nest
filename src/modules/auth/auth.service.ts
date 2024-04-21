import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtEnum } from 'src/enum/auth.enum';
import { JwtService } from '@nestjs/jwt';
import { UserAndTierDto } from './dto/output/userAndTier.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async githubLogin(githubName: string) {
    let user: UserAndTierDto;
    user = await this.authRepository.findUserByGithubName(githubName);

    if (!user) {
      // create user
      const { nickname } = await this.authRepository.saveUser(githubName);
      user = await this.authRepository.findUserByGithubName(nickname);
    }

    // access_token 발급
    const access_token = this.jwtGenerator({
      id: user.userId,
      nickname: user.nickname,
      tier: user.Tiers.tierId,
      key: JwtEnum.ACCESS_TOKEN,
    });

    // refresh_token 발급
    const refresh_token = this.jwtGenerator({
      id: null,
      nickname: null,
      tier: null,
      key: JwtEnum.REFRESH_TOKEN,
    });

    if (user.refreshToken) {
    }
    await this.authRepository.updateRefreshToken(user.userId, refresh_token);

    return { access_token, refresh_token };
  }

  jwtGenerator({ id, nickname, tier, key }) {
    // access_token 발급
    if (key === JwtEnum.ACCESS_TOKEN) {
      const access_token = this.jwtService.sign(
        { id: id, nickname: nickname, tier: tier },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      );

      return access_token;
    }

    // refresh_token 발급
    if (key === JwtEnum.REFRESH_TOKEN) {
      const refresh_token = this.jwtService.sign(
        {},
        {
          secret: process.env.REFRESH_SECRET,
          expiresIn: process.env.REFRESH_EXPIRES_IN,
        },
      );

      return refresh_token;
    }
  }

  async logout(userId: number): Promise<void> {
    await this.authRepository.updateRefreshToken(userId, null);
    return;
  }
}
