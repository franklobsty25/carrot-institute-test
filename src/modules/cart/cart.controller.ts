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
import {
  CheckoutDTO,
  CreateCartDTO,
  FilterCartDTO,
  UpdateCartDTO,
} from './dto';
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Fetch cart records with pagination' })
  @ApiOkResponse({ description: 'Cart lists' })
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

  @ApiParam({
    name: 'cartId',
    description: 'Cart ID to fetch',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Fetch cart record' })
  @ApiForbiddenResponse({ description: 'Forbidden response' })
  @ApiNotFoundResponse({ description: 'Cart record not found' })
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

  @ApiOperation({ summary: 'Cart checkout with paystack payment' })
  @ApiOkResponse({ description: 'Cart checkout' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() carts: CheckoutDTO[],
  ): Promise<void> {
    try {
      const { message } = await this.cartService.checkoutCart(user, carts);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Carts checkout successfully',
        message,
      );
    } catch (error) {
      console.log(error);
      ResponseService.json(res, error);
    }
  }

  @ApiParam({
    name: 'menuId',
    description: 'Menu ID to add to cart',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Add menu to cart' })
  @ApiOkResponse({ description: 'Menu added to cart' })
  @ApiNotFoundResponse({ description: 'Menu record not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @MenuParamGuard()
  @Post(':menuId/add')
  async addCart(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @GetMenuFromParam() menu: MenuDocument,
    @Body() payload: CreateCartDTO,
  ): Promise<void> {
    try {
      const cart = await this.cartService.addToCart(
        user,
        menu,
        payload.quantity,
      );

      ResponseService.json(res, HttpStatus.OK, 'Menu added to cart', cart);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @ApiParam({
    name: 'cartId',
    description: 'Cart ID to edit',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Update cart quantity' })
  @ApiOkResponse({ description: 'Cart updated' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Cart record not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @CartAccessGuard()
  @Put(':cartId/edit')
  async update(
    @Res() res: Response,
    @GetCartFromParam() cart: CartDocument,
    @Body() payload: UpdateCartDTO,
  ): Promise<void> {
    try {
      const updatedCart = await this.cartService.updateCartQuantity(
        cart,
        payload.quantity,
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

  @ApiParam({
    name: 'cartId',
    description: 'Cart ID to delete',
    example: '649578f843317759a6add00e',
  })
  @ApiOperation({ summary: 'Remove menu from cart' })
  @ApiOkResponse({ description: 'Cart deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Cart record not found' })
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
