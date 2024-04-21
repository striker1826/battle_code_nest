import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Date } from './date.entity';
import { Users } from './user.entity';

@Entity({ name: 'tier' })
export class Tiers extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'tierId',
    comment: '티어의 아이디',
  })
  tierId: number;

  @Column('varchar', { name: 'tierName', comment: '티어의 이름' })
  tierName: string;

  @OneToMany(() => Users, (users) => users.tierId)
  Users: Users[];
}
