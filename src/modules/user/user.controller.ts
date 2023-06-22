import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { FilterUserDTO, RoleDTO, UpdateUserDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from './decoretors/current-user.decorator';
import { UserDocument } from './schema/user.schema';
import {
  GetUserFromParam,
  UserParamGuard,
} from './decoretors/user-param.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listUsers(@Res() res: Response) {
    try {
      const { docs, ...metadata } = await this.userService.fetchUsers();

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

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async update(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() updateDTO: UpdateUserDTO,
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(user.id, updateDTO);

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

  @UseGuards(JwtAuthGuard)
  @Put('switch/role')
  async becomeASellerOrBuyer(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() payload: RoleDTO,
  ): Promise<void> {
    try {
      const newRole = await this.userService.sellerOrBuyer(user, payload.role);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User role changed successfully',
        newRole,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UserParamGuard()
  @Delete(':userId/delete')
  async delete(
    @Res() res: Response,
    @GetUserFromParam() user: UserDocument,
  ): Promise<void> {
    try {
      const deletedUser = await this.userService.softDeleteUser(user.id);

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
