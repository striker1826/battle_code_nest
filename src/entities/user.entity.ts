import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from './date.entity';
import { Tiers } from './tier.entity';
import { RoomUsers } from './roomUser.entity';

@Entity({ name: 'users' })
export class Users extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'userId',
    comment: '유저의 아이디',
  })
  userId: number;

  @Column('varchar', { name: 'nickname', comment: '유저의 닉네임' })
  nickname: string;

  @Column('bigint', { name: 'tierId', comment: '유저의 티어 아이디' })
  tierId: number;

  @Column('varchar', {
    name: 'refreshToken',
    comment: '리프레시 토큰',
    nullable: true,
  })
  refreshToken: string;

  @ManyToOne(() => Tiers, (tiers) => tiers.Users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tierId', referencedColumnName: 'tierId' }])
  Tiers: Tiers;

  @OneToMany(() => RoomUsers, (roomUsers) => roomUsers.userId)
  RoomUsers: RoomUsers[];
}
