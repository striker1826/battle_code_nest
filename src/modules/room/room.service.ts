import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { RoomDto } from './dto/input/room.dto';
import { RoomEnum } from 'src/enum/room.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomRepository) private readonly roomRepository: RoomRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createRoom(room: RoomDto, userId: number) {
    const { roomName } = room;

    // 이름이 같은 방이 있는지 확인 --> 있으면 에러
    const isRoomByRoomName = await this.roomRepository.findRoomByName(roomName);
    if (isRoomByRoomName) {
      throw new ForbiddenException(RoomEnum.ALREADY_EXIST_ROOM);
    }

    // 이미 방에 속해있는 유저인지 확인 --> 있으면 에러
    const isRoomUserByUserId = await this.roomRepository.findByRoomUserByUserId(
      userId,
    );
    if (isRoomUserByUserId) {
      throw new ForbiddenException(RoomEnum.ALREADY_BELONG_USER);
    }

    await this.dataSource.transaction(async (manager) => {
      // 방 생성
      const { roomId } = await this.roomRepository.saveRoom(manager, room);

      // 방에 유저 추가
      await this.roomRepository.saveRoomUser(manager, roomId, userId);
      return;
    });
  }
}
