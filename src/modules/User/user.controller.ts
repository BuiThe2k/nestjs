import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
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
  //Override status code bằng res của express
//   @Post('/users')
//   create(@Res() res: Response) {
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
