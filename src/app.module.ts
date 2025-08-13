import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/User/user.model'
// Khai báo DB connection
const AppDataSource = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'demo',
  synchronize: true,
  entities: [User],
});
// Decorater
@Module({
  // Khai báo các modules cho application
  // Các sub modules cần được khai báo mới có thể hoạt động
  imports: [AppDataSource, UserModule],
  // Khai báo các controllers cho application
  controllers: [AppController],
  // Khai báo các services được sử dụng trong các controllers
  providers: [AppService],
})
export class AppModule {}
