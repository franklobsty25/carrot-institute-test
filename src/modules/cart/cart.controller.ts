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
import { CartService } from './cart.service';
import { Response } from 'express';
import { FilterCartDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { CartDocument } from './schema/cart.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../user/schema/user.schema';
import { MenuDocument } from '../menu/schema/menu.schema';
import {
  CartAccessGuard,
  GetCartFromParam,
} from './decorator/cart-access-param.decorator';
import {
  GetMenuFromParam,
  MenuParamGuard,
} from '../menu/decorator/menu-access-param.decorator';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth('defaultBearerAuth')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() filter?: FilterCartDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.cartService.fetchCarts(filter);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Carts found successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @CartAccessGuard()
  @Get(':cartId')
  async getCart(
    @Res() res: Response,
    @GetCartFromParam() cart: CartDocument,
  ): Promise<void> {
    try {
      ResponseService.json(res, HttpStatus.OK, 'Cart found successfully', cart);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() carts: CartDocument[],
  ): Promise<void> {
    try {
      const status = await this.cartService.checkoutCart(user, carts);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Carts checkout successfully',
        status,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @MenuParamGuard()
  @Post(':menuId/add')
  async addCart(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @GetMenuFromParam() menu: MenuDocument,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<void> {
    try {
      const cart = await this.cartService.addToCart(user, menu, quantity);

      ResponseService.json(res, HttpStatus.OK, 'Menu added to cart', cart);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @CartAccessGuard()
  @Put(':cartId/edit')
  async update(
    @Res() res: Response,
    @GetCartFromParam() cart: CartDocument,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<void> {
    try {
      const updatedCart = await this.cartService.updateCartQuantity(
        cart,
        quantity,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Cart quantity updated successfully',
        updatedCart,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @CartAccessGuard()
  @Delete(':cartId/delete')
  async remove(
    @Res() res: Response,
    @GetCartFromParam() cart: CartDocument,
  ): Promise<void> {
    try {
      const deleteCart = await this.cartService.removeCart(cart);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Cart deleted successfully',
        deleteCart,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
