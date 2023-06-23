import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { FilterOrderDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  GetOrderFromParam,
  OrderAccessGuard,
  OrderDeliveryGuard,
} from './decorators/order-access-param.decorator';
import { OrderDocument } from './schema/order.schema';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import {
  GetMenuFromParam,
  MenuParamGuard,
} from '../menu/decorator/menu-access-param.decorator';
import { MenuDocument } from '../menu/schema/menu.schema';
import { OrderCompletionGuard } from './decorators/order-complete.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth('defaultBearerAuth')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() filter: FilterOrderDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.orderService.fetchOrders(filter);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Orders fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @OrderAccessGuard()
  @Get(':orderId')
  async getOrder(
    @Res() res: Response,
    @GetOrderFromParam() order: OrderDocument,
  ): Promise<void> {
    try {
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Order found successfully',
        order,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @MenuParamGuard()
  @Post(':menuId/place')
  async placeOrder(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @GetMenuFromParam() menu: MenuDocument,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<void> {
    try {
      const status = await this.orderService.placeOrder(user, menu, quantity);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Order placed successfully',
        status,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  // Only Seller or Admin access
  @OrderDeliveryGuard()
  @Put(':orderId/delivery')
  async deliveryInTransit(
    @Res() res: Response,
    @GetOrderFromParam() order: OrderDocument,
  ): Promise<void> {
    try {
      const transitOrder = await this.orderService.markAsInTransit(order);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Order delivery in transit to customer',
        transitOrder,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  // Only user who made an order
  @OrderCompletionGuard()
  @Put(':orderId/complete')
  async orderCompleted(
    @Res() res: Response,
    @GetOrderFromParam() order: OrderDocument,
  ): Promise<void> {
    try {
      const completedOrder = await this.orderService.markAsCompleted(order);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Order completed successfully',
        completedOrder,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @OrderAccessGuard()
  @Delete(':orderId/delete')
  async hideCompletedOrder(
    @Res() res: Response,
    @GetOrderFromParam() order: OrderDocument,
  ): Promise<void> {
    try {
      const hiddenOrder = await this.orderService.markAsSoftDelete(order);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Order deleted successfully',
        hiddenOrder,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
