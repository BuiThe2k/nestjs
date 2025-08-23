import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { error } from 'console';
import { Filter, Paging } from './dto/findAll.dto';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async findAllWithCondition(paging: Paging, filter: Filter) {
        try {
            const { page, pageSize } = paging;
            const { role } = filter;
            
            let where: FindOptionsWhere<User> = {};
            if (role) {
                where.role =  role ;
            }
            
            const total = await this.userRepository.count();
            const users = await this.userRepository.find({
                where,
                take: pageSize || 10,
                skip: (page -1) * pageSize || 0,
            });
            return {
                data: users,
                paging: {
                    total,
                    page: page || 1,
                    pageSize: pageSize || 10,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async findOneWithCondition(condition: Record<string, unknown>) {
        try {
            const user = await this.userRepository.findOneBy(condition);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async create(data: CreateUserDto) {
        try {
            const user = await this.userRepository.findOneBy({ email: data.email });
            if (user) {
                throw new BadRequestException('Email already exists');
            }
            return await this.userRepository.save(data);
        } catch (error) {
            throw error;
        }
    }
}
