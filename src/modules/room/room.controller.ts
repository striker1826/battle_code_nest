import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomService } from './room.service';
import { RoomDto } from './dto/input/room.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { SocketEvent } from 'src/enum/socketEvent.enum';
import { CreatedRoomDto } from './dto/output/createdRoom.dto';
import { CheckValidEnterRoom } from './dto/input/checkValidEnterRoom';
import { UtilsService } from 'src/utils/utils.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRoom(
    @Body() room: RoomDto,
    @User() { id }: any,
  ): Promise<CreatedRoomDto> {
    const result = await this.roomService.createRoom(room, id);
    return result;
  }
}

@WebSocketGateway()
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(SocketEvent.CREATE_ROOM)
  async joinRoom(
    @MessageBody() data: CheckValidEnterRoom,
    @ConnectedSocket() socket: Socket,
  ) {
    const result = await this.roomService.socketJoinRoom(data, socket);

    // 정상적인 경로로 접속했을 경우
    if (result.result) {
      socket.emit(SocketEvent.JOIN_ROOM_SUCCESS);
      return;
    }

    // 비정상적인 경로로 접속했을 경우
    if (!result.result) {
      socket.emit(SocketEvent.JOIN_ROOM_FAIL);
      return;
    }
  }
}
