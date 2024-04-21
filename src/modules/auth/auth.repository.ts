import { Users } from 'src/entities/user.entity';
import { UserAndTierDto } from './dto/output/userAndTier.dto';

export interface AuthRepository {
  // create
  saveUser(nickname: string): Promise<Users>;

  // read
  findUserByGithubName(githubName: string): Promise<UserAndTierDto>;

  // update
  updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}

export const AuthRepository = Symbol('AuthRepository');
