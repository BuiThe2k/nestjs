import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request, Response } from 'express';
import type { Filter, FindAllQuery, Paging } from './dto/findAll.dto';
import type { CreateUserDto } from './dto/create.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users')
  findAll(@Query() query: FindAllQuery) {
    const paging: Paging = { page: query.page, pageSize: query.pageSize };
    const filter: Filter = { role: query.role};
    return this.userService.findAllWithCondition(paging, filter);
  }
  @Get('/users/:id')
  findById(@Param('id') id: string) {
    return this.userService.findOneWithCondition({id});
  }
  //Override status code bằng res của express
//   @Post('/users')
//   create(@Res() res: Response) 
//     res.status(201).json('Create users success');
//   }
  // Override status code bằng HttpCode decorater
  @Post('/users')
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    if (!Object.keys(createUserDto).length) {
      throw new BadRequestException('Email is required');
    }
    return this.userService.create(createUserDto);
  }
}

// localhost:3000/users?page=1&pageSize=10
