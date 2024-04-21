import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Tiers } from 'src/entities/tier.entity';
import { Users } from 'src/entities/user.entity';
import { Rooms } from 'src/entities/room.entity';
import { RoomUsers } from 'src/entities/roomUser.entity';
import { Categories } from 'src/entities/category.entity';
import { Questions } from 'src/entities/question.entity';
import { TestCases } from 'src/entities/testCase.entity';

const databaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: () => {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Tiers,
        Users,
        Rooms,
        RoomUsers,
        Categories,
        Questions,
        TestCases,
      ],
      charset: 'utf8mb4',
      synchronize: false,
      logging: true,
    };
  },
});

@Module({
  imports: [databaseModule],
  exports: [databaseModule],
})
export class DatabaseModule {}
