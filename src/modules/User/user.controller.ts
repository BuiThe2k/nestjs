import { Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request, Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users')
  findAll(@Req() req: Request) {
    console.log(req.query);
    return 'Get users success';
  }
  @Get('/users/:id')
  findById(@Param('id') id: string) {
    console.log(id);
    // Xử lý trả lỗi về cho client
    // 
    throw new NotFoundException("user not found");
  }
  //Override status code bằng res của express
//   @Post('/users')
//   create(@Res() res: Response) 
//     res.status(201).json('Create users success');
//   }
  // Override status code bằng HttpCode decorater
  @Post('/users')
  @HttpCode(201)
  create() {
    return 'Create users success';
  }
}

// localhost:3000/users?page=1&pageSize=10
