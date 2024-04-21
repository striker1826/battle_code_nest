import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { RoomRepositoryImpl } from './room.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/room.entity';
import { RoomUsers } from 'src/entities/roomUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms, RoomUsers])],
  controllers: [RoomController],
  providers: [
    RoomService,
    { provide: RoomRepository, useClass: RoomRepositoryImpl },
  ],
})
export class RoomModule {}
