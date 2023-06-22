import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Response } from 'express';
import {
  CreateRestaurantDTO,
  FilterRestaurantDTO,
  UpdateRestaurantDTO,
} from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import {
  GetRestaurantFromParam,
  RestaurantParamGuard,
} from './decorators/restaurant-param.decorator';
import { RestaurantDocument } from './schema/restaurant.schema';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() payload: FilterRestaurantDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } =
        await this.restaurantService.fetchRestaurants(payload);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Restaurants found successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RestaurantParamGuard()
  @Get(':restaurantId')
  async singleRestaurant(
    @Res() res: Response,
    @GetRestaurantFromParam() restaurant: RestaurantDocument,
  ): Promise<void> {
    try {
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Restaurant found successfully',
        restaurant,
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
    @Body() restaurantDTO: CreateRestaurantDTO,
  ): Promise<void> {
    try {
      const restaurant = await this.restaurantService.createRestaurant(
        user,
        restaurantDTO,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Restaurant created successfully',
        restaurant,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RestaurantParamGuard()
  @Put(':restaurantId/edit')
  async update(
    @Res() res: Response,
    @GetRestaurantFromParam() restaurant: RestaurantDocument,
    @Body() updateRestaurantDTO: UpdateRestaurantDTO,
  ): Promise<void> {
    try {
      const updatedRestaurant = await this.restaurantService.updateRestaurant(
        restaurant.id,
        updateRestaurantDTO,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Restaurant information updated successfully',
        updatedRestaurant,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RestaurantParamGuard()
  @Delete(':restaurantId/delete')
  async delete(
    @Res() res: Response,
    @GetRestaurantFromParam() restaurant: RestaurantDocument,
  ): Promise<void> {
    try {
      const deletedRestaurant = await this.restaurantService.softDeleteRestaurant(
        restaurant.id,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Restaurant information deleted successfully',
        deletedRestaurant,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
