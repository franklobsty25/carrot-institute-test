import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose';
import { CART } from 'src/common/constants/schemas';
import { CartDocument } from './schema/cart.schema';
import { CheckoutDTO, FilterCartDTO } from './dto';
import { UserDocument } from '../user/schema/user.schema';
import { MenuDocument } from '../menu/schema/menu.schema';
import * as moment from 'moment';
import { Cron } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CART);

  constructor(
    @InjectModel(CART) private readonly cartModel: PaginateModel<CartDocument>,
    private readonly orderService: OrderService,
  ) {}

  async fetchCarts(
    filter?: FilterCartDTO,
  ): Promise<PaginateResult<CartDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<CartDocument> = {};

    if (search) {
      query.$or = [{ quantity: { $regrex: search, $options: 'i' } }];
    }

    return await this.cartModel.paginate(query, {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: [{ path: 'user' }, { path: 'menu' }],
    });
  }

  async getCartById(cartId: string): Promise<CartDocument> {
    return await this.cartModel.findOne({ _id: cartId, softDelete: false });
  }

  async checkoutCart(
    user: UserDocument,
    cartIds: CheckoutDTO[],
  ): Promise<any> {
    const carts = await Promise.all(
      cartIds.map(async ({ cart }) => {
        return await this.cartModel
          .findOne({ _id: cart, softDelete: false })
          .populate(['user', 'menu']);
      }),
    );

    const totalPrice = carts.reduce(
      (acc, cart) => acc + cart.menu.price * cart.quantity,
      0,
    );

    const payload = {
      email: user.email,
      amount: totalPrice,
    };

    const response = await this.orderService.initializePayment(payload);

    const verify = await this.orderService.verifyPayment(
      response?.data?.reference,
    );

    if (!verify.status) throw new BadRequestException('Payment failed!');

    await Promise.all(
      carts.map(async (cart) => {
        await this.orderService.placeOrder(user, cart.menu, cart.quantity);
        await this.cartModel.findByIdAndDelete(cart.id);
      }),
    );

    return { message: verify?.message };
  }

  async addToCart(
    user: UserDocument,
    menu: MenuDocument,
    quantity: number,
  ): Promise<CartDocument> {
    return await this.cartModel.create({ quantity, user, menu });
  }

  async updateCartQuantity(
    cart: CartDocument,
    quantity: number,
  ): Promise<CartDocument> {
    const updatedCart = await this.cartModel.findByIdAndUpdate(
      cart._id,
      { $set: { quantity } },
      { new: true },
    );

    if (!updatedCart)
      throw new NotFoundException(`Cart with ${cart._id} does not exist`);

    return updatedCart;
  }

  async removeCart(cart: CartDocument): Promise<CartDocument> {
    return await this.cartModel.findByIdAndDelete(cart._id);
  }

  @Cron('0 1 * * * *')
  async clearCartAfter30Days(): Promise<void> {
    const carts = await this.cartModel.find({ expires: moment().toDate() });

    await Promise.all(
      carts.map(async (cart) => {
        await this.cartModel.findByIdAndDelete(cart._id);
      }),
    );

    this.logger.log('Long lasting cart items removed');
  }
}
