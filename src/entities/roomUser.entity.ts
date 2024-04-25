import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from './date.entity';
import { Users } from './user.entity';
import { Rooms } from './room.entity';

@Entity({ name: 'roomUser' })
export class RoomUsers extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'roomUserId',
    comment: '방 유저의 아이디',
  })
  roomUserId: number;

  @Column('bigint', { name: 'roomId', comment: '방의 아이디' })
  roomId: number;

  @Column('bigint', { name: 'userId', comment: '유저의 아이디' })
  userId: number;

  @Column('varchar', { name: 'code', comment: '코드' })
  code: string;

  @ManyToOne(() => Users, (users) => users.RoomUsers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  Users: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.RoomUsers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'roomId' }])
  Rooms: Rooms;
}
