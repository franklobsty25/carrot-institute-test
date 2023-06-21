import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async listUsers(@Res() res: Response) {
    try {
      const { docs, ...metadata } = await this.userService.fetchAllUsers();

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Users fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Get('search')
  async search(
    @Res() res: Response,
    @Query('search') search: string,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.userService.searchUsers(search);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Users fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Post('create')
  async create(
    @Res() res: Response,
    @Body() userDTO: CreateUserDTO,
  ): Promise<void> {
    try {
      const user = await this.userService.createUser(userDTO);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User information created successfully',
        user,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Put(':userId/edit')
  async update(
    @Res() res: Response,
    @Param('userId') userId: string,
    @Body() updateDTO: UpdateUserDTO,
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(userId, updateDTO);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User information updated successfully',
        updatedUser,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Delete(':userId/delete')
  async delete(
    @Res() res: Response,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      const deletedUser = await this.userService.deleteUser(userId);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User information deleted successfully',
        deletedUser,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
