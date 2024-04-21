import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Date } from './date.entity';
import { RoomUsers } from './roomUser.entity';

@Entity({ name: 'room' })
export class Rooms extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'roomId',
    comment: '방의 아이디',
  })
  roomId: number;

  @Column('varchar', { name: 'roomName', comment: '방의 이름' })
  roomName: string;

  @Column('int', { name: 'count', comment: '방의 인원 수' })
  count: number;

  @Column('boolean', { name: 'isReady', comment: '게임 시작 여부' })
  isReady: boolean;

  @Column('int', { name: 'readyCount', comment: '준비 상태인 사람의 수' })
  readyCount: number;

  @OneToMany(() => RoomUsers, (roomUsers) => roomUsers.roomId)
  RoomUsers: RoomUsers[];
}
