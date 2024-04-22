import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { Rooms } from 'src/entities/room.entity';
import { EntityManager, Repository } from 'typeorm';
import { RoomUsers } from 'src/entities/roomUser.entity';
import { RoomDto } from './dto/input/room.dto';

export class RoomRepositoryImpl implements RoomRepository {
  constructor(
    @InjectRepository(Rooms) private readonly roomModel: Repository<Rooms>,
    @InjectRepository(RoomUsers)
    private readonly roomUserModel: Repository<RoomUsers>,
  ) {}

  async saveRoom(manager: EntityManager, room: RoomDto): Promise<Rooms> {
    const newRoom = manager.getRepository(Rooms).create();
    newRoom.roomName = room.roomName;
    newRoom.count = 1;
    newRoom.isReady = false;
    newRoom.readyCount = 0;

    const createdRoom = await manager.getRepository(Rooms).save(newRoom);
    return createdRoom;
  }

  async saveRoomUser(
    manager: EntityManager,
    roomId: number,
    userId: number,
    randomString: string,
  ): Promise<void> {
    const newRoomUser = manager.getRepository(RoomUsers).create();
    newRoomUser.roomId = roomId;
    newRoomUser.userId = userId;
    newRoomUser.code = randomString;

    await manager.getRepository(RoomUsers).save(newRoomUser);
    return;
  }

  // read
  async findRoomByName(roomName: string): Promise<Rooms> {
    const room = await this.roomModel.findOne({ where: { roomName } });
    return room;
  }

  async findRoomUserByUserId(userId: number): Promise<RoomUsers> {
    const roomUser = await this.roomUserModel.findOne({ where: { userId } });
    return roomUser;
  }

  async findRoomUser(
    roomId: number,
    userId: number,
    code: string,
  ): Promise<RoomUsers> {
    const roomUser = await this.roomUserModel.findOne({
      where: { roomId, userId, code },
    });

    return roomUser;
  }
}
