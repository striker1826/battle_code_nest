import { Rooms } from 'src/entities/room.entity';
import { RoomUsers } from 'src/entities/roomUser.entity';
import { RoomDto } from './dto/input/room.dto';
import { EntityManager } from 'typeorm';

export interface RoomRepository {
  // create
  saveRoom(manager: EntityManager, room: RoomDto): Promise<Rooms>;
  saveRoomUser(
    manager: EntityManager,
    roomId: number,
    userId: number,
    randomString: string,
  ): Promise<void>;

  // read
  findRoomByName(roomName: string): Promise<Rooms>;
  findByRoomUserByUserId(userId: number): Promise<RoomUsers>;
}

export const RoomRepository = Symbol('RoomRepository');
