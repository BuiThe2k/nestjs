import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// Decorater
@Module({
  imports: [],
  // Khai báo các controllers cho application
  controllers: [UserController],
  // Khai báo các services được sử dụng trong các controllers
  providers: [UserService],
})
export class UserModule {}
