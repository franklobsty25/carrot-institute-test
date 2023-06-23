import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CartService } from '../cart.service';
import { CartDocument } from '../schema/cart.schema';

@Injectable()
export class CartPutToRequestGuard implements CanActivate {
  constructor(private readonly cartService: CartService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const cart: CartDocument = await this.cartService.getCartById(
      params.cartId,
    );

    request.__cart = cart;

    return true;
  }
}
