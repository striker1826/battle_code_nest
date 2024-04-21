export class UserAndTierDto {
  userId: number;
  nickname: string;
  refreshToken: string;
  Tiers: {
    tierId: number;
    tierName: string;
  };
}
