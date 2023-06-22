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
  MenuParamGuard,
} from './decorators/menu-param.decorator';
import { MenuDocument } from './schema/menu.schema';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateCommentDTO, FilterCommentDTO } from '../comment/dto';
import {
  CommentParamGuard,
  GetCommentFromParam,
} from '../comment/decorators/comment-param.decorator';
import { CommentDocument } from '../comment/schema/comment.schema';

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
  @MenuParamGuard()
  @Get(':menuId')
  async singleMenu(
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
  @MenuParamGuard()
  @Get(':menuId/comments')
  async fetchMenuComments(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
    @Query() payload: FilterMenuDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.menuService.fetchMenuComments(
        menu,
        payload,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu with comments fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @MenuParamGuard()
  @CommentParamGuard()
  @Get(':menuId/comments/:commentId')
  async fetchMenuComment(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
    @GetCommentFromParam() comment: CommentDocument,
  ): Promise<void> {
    try {
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Menu with comment found successfully',
        comment,
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
  @MenuParamGuard()
  @Put(':menuId/edit')
  async update(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
    @Body() updateMenuDTO: UpdateMenuDTO,
  ): Promise<void> {
    try {
      const updatedMenu = await this.menuService.updateMenu(
        menu.id,
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
  @MenuParamGuard()
  @Put(':menuId/comment')
  async addCommentToMenu(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
    @Body() payload: CreateCommentDTO,
  ) {
    try {
      await this.menuService.addCommentToMenu(menu, payload);

      ResponseService.json(res, HttpStatus.OK, 'Comment added to menu');
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @MenuParamGuard()
  @Delete(':menuId/delete')
  async delete(
    @Res() res: Response,
    @GetMenuFromParam() menu: MenuDocument,
  ): Promise<void> {
    try {
      const deletedMenu = await this.menuService.softDeleteMenu(menu.id);

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
