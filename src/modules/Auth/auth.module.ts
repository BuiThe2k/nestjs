import { Inject, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../User/user.model';

@Module({
  imports: [ 
    // Setup sử dụng JwtModule bên trong các services được quản lý bởi AuthModule
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('SECRET_KEY'),
        signOptions: { expiresIn: '12h', },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
