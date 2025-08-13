import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { error } from 'console';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async findAllWithCondition() {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw error;
        }
    }
}
