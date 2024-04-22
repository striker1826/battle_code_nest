import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController, RoomGateway } from './room.controller';
import { RoomRepository } from './room.repository';
import { RoomRepositoryImpl } from './room.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/room.entity';
import { RoomUsers } from 'src/entities/roomUser.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms, RoomUsers]), UtilsModule],
  controllers: [RoomController],
  providers: [
    RoomService,
    { provide: RoomRepository, useClass: RoomRepositoryImpl },
    RoomGateway,
  ],
})
export class RoomModule {}
