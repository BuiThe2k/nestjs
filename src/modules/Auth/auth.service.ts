import { BadRequestException, Catch, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../User/user.model';
import { LoginDto } from './dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) 
    private readonly userRepository: Repository<User>, 
    private jwtService: JwtService, ) {}
    async login(loginDto: LoginDto) {
        try{
            const user = await this.userRepository.findOne({ 
                where: { email: loginDto.email } 
            });
            if(!user) {
                throw new BadRequestException("email or password invalid");
            }
            return {
                accessToken: this.jwtService.sign({ email: user.email }),
                expiresIn: 60 * 60 * 12 // 12 hours
            };
        } catch (error) {
            if(error instanceof QueryFailedError){
                throw new InternalServerErrorException();
            }
            throw error;
        }
    }
}
