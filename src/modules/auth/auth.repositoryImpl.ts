import { Users } from 'src/entities/user.entity';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAndTierDto } from './dto/output/userAndTier.dto';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(Users) private readonly userModel: Repository<Users>,
  ) {}

  // create
  async saveUser(nickname: string): Promise<Users> {
    const newUser = this.userModel.create();
    newUser.nickname = nickname;
    newUser.tierId = 1;

    const savedUser = await this.userModel.save(newUser);
    return savedUser;
  }

  // read
  async findUserByGithubName(githubName: string): Promise<UserAndTierDto> {
    const user = await this.userModel
      .createQueryBuilder('user')
      .where('user.nickname = :githubName', { githubName })
      .leftJoin('user.Tiers', 'tier')
      .select(['user.userId', 'user.nickname', 'tier.tierId', 'tier.tierName'])
      .getOne();

    return user;
  }
}
