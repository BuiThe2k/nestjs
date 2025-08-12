import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
// Decorater
@Module({
  // Khai báo các modules cho application
  // Các sub modules cần được khai báo mới có thể hoạt động
  imports: [UserModule],
  // Khai báo các controllers cho application
  controllers: [AppController],
  // Khai báo các services được sử dụng trong các controllers
  providers: [AppService],
})
export class AppModule {}
