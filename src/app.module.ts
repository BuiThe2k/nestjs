import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/User/user.model'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { AuthModule } from './modules/Auth/auth.module';
// Khai báo DB connection
const AppDataSource = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
     type: 'mysql',
  host: config.get('MYSQL_HOST'),
  port: config.get('MYSQL_PORT'),
  username: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: config.get('MYSQL_DB'),
  synchronize: true,
  entities: [User],
  }),
  inject: [ConfigService],
});
// Decorater
@Module({
  // Khai báo các modules cho application
  // Các sub modules cần được khai báo mới có thể hoạt động
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSource,
    // Internal Module 
    UserModule,
    AuthModule,
  ],
  // Khai báo các controllers cho application
  controllers: [AppController],
  // Khai báo các services được sử dụng trong các controllers
  providers: [AppService],
})
export class AppModule {}
