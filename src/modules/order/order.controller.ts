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
import { CreateOrderDTO, FilterOrderDTO } from './dto';
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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Fetch order records with pagination' })
  @ApiOkResponse({ description: 'Order lists' })
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

  @ApiParam({
    name: 'orderId',
    description: 'Order ID to fetch',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Fetch order record' })
  @ApiOkResponse({ description: 'Order found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Order record not found' })
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

  @ApiParam({
    name: 'menuId',
    description: 'Menu ID to place the order',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Place an order with paystack payment' })
  @ApiOkResponse({ description: 'Order placed' })
  @ApiNotFoundResponse({ description: 'Menu record not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @MenuParamGuard()
  @Post(':menuId/place')
  async placeOrder(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @GetMenuFromParam() menu: MenuDocument,
    @Body() payload: CreateOrderDTO,
  ): Promise<void> {
    try {
      const status = await this.orderService.placeOrder(
        user,
        menu,
        payload.quantity,
      );

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
  @ApiParam({
    name: 'orderId',
    description: 'Order ID to dispatch the order',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Dispatch order placed to user' })
  @ApiOkResponse({ description: 'Order dispatch' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Order record not found' })
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
        'Order delivery in transit to user',
        transitOrder,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  // Only user who made an order
  @ApiParam({
    name: 'orderId',
    description: 'Order ID to mark as completed',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Complete order placed by user' })
  @ApiOkResponse({ description: 'Order completed' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Order record not found' })
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

  @ApiParam({
    name: 'orderId',
    description: 'Order ID to delete',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Delete order record softly' })
  @ApiOkResponse({ description: 'Order deleted softly' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Order record not found' })
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
