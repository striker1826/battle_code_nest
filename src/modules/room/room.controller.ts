import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/input/room.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRoom(@Body() room: RoomDto, @User() { id }: any): Promise<void> {
    await this.roomService.createRoom(room, id);
    return;
  }
}
