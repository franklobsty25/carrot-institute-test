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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Menu')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: 'Fetch menu records with pagination' })
  @ApiOkResponse({ description: 'Menus lists' })
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

  @ApiParam({
    name: 'menuId',
    description: 'Menu ID to fetch',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Fetch menu record' })
  @ApiOkResponse({ description: 'Menu found' })
  @ApiNotFoundResponse({ description: 'Menu record not found' })
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

  @ApiOperation({ summary: 'Create menu record' })
  @ApiCreatedResponse({ description: 'Menu created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
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

  @ApiParam({
    name: 'menuId',
    description: 'Menu ID to edit',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Update menu record' })
  @ApiOkResponse({ description: 'Menu updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Menu record not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
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

  @ApiParam({
    name: 'menuId',
    description: 'Menu ID to delete',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Delete menu record softly' })
  @ApiOkResponse({ description: 'Menu deleted softly' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Menu record not found' })
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
