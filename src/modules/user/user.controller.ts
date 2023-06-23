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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'User records found' })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listUsers(@Res() res: Response, @Query() filter: FilterUserDTO) {
    try {
      const { docs, ...metadata } = await this.userService.fetchUsers(filter);

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

  @ApiOkResponse({ description: 'User record edit' })
  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async update(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() updateDTO: UpdateUserDTO,
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(
        user._id,
        updateDTO,
      );

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

  @ApiOkResponse({ description: 'User role switched' })
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

  @ApiOkResponse({ description: 'User record deleted' })
  @UseGuards(JwtAuthGuard)
  @UserParamGuard()
  @Delete(':userId/delete')
  async delete(
    @Res() res: Response,
    @GetUserFromParam() user: UserDocument,
  ): Promise<void> {
    try {
      const deletedUser = await this.userService.softDeleteUser(user._id);

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
