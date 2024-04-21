export class UserAndTierDto {
  userId: number;
  nickname: string;
  // tierId: number;
  Tiers: {
    tierId: number;
    tierName: string;
  };
}
