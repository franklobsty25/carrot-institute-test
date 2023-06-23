import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CartService } from '../cart.service';
import { CartDocument } from '../schema/cart.schema';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly cartService: CartService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const cart: CartDocument = await this.cartService.getCartById(
      params.cartId,
    );

    const isUserCart = user.id.toString() == cart.user.toString();

    if (!isUserCart)
      throw new ForbiddenException('Cart does not belong to user');

    return isUserCart;
  }
}
