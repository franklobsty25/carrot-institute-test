import {
  Controller,
  HttpStatus,
  Query,
  Res,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Response } from 'express';
import { CreateMenuDTO, FilterMenuDTO, UpdateMenuDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import {
  GetMenuFromParam,
  MenuAccessGuard,
} from './decorator/menu-access-param.decorator';
import { MenuDocument } from './schema/menu.schema';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Menu')
@ApiBearerAuth('defaultBearerAuth')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() payload: FilterMenuDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.menuService.fetchMenus(payload);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu items fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @MenuAccessGuard()
  @Get(':menuId')
  async getMenu(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
  ): Promise<void> {
    try {
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu item found successfully',
        menu,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async create(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() createMenuDTO: CreateMenuDTO,
  ): Promise<void> {
    try {
      const menu = await this.menuService.createMenu(user, createMenuDTO);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu item created successfully',
        menu,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @MenuAccessGuard()
  @Put(':menuId/edit')
  async update(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
    @Body() updateMenuDTO: UpdateMenuDTO,
  ): Promise<void> {
    try {
      const updatedMenu = await this.menuService.updateMenu(
        menu._id,
        updateMenuDTO,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu item updated successfully',
        updatedMenu,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @MenuAccessGuard()
  @Delete(':menuId/delete')
  async delete(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
  ): Promise<void> {
    try {
      const deletedMenu = await this.menuService.softDeleteMenu(menu._id);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu item deleted successfully',
        deletedMenu,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
