import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
// Decorater
@Module({
  imports: [
    // Khai báo sử dụng UserEntiti trong các services do UserModule quản lý
    TypeOrmModule.forFeature([User])
  ],
  // Khai báo các controllers cho application
  controllers: [UserController],
  // Khai báo các services được sử dụng trong các controllers
  providers: [UserService],
})
export class UserModule {}


