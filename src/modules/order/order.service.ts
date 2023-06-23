import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose';
import { ORDER, OrderEnum } from 'src/common/constants/schemas';
import { OrderDocument } from './schema/order.schema';
import { UserDocument } from '../user/schema/user.schema';
import { MenuDocument } from '../menu/schema/menu.schema';
import { FilterOrderDTO } from './dto';
import configuration from 'src/common/config/configuration';
import { PaymentDTO } from '../cart/dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(ORDER)
    private readonly orderModel: PaginateModel<OrderDocument>,
  ) {}

  async fetchOrders(
    filter?: FilterOrderDTO,
  ): Promise<PaginateResult<OrderDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<OrderDocument> = {
      softDelete: false,
    };

    if (search) {
      query.$or = [
        { status: { $regrex: search, $options: 'i' } },
        { createdAt: { $regrex: search, $options: 'i' } },
      ];
    }

    return await this.orderModel.paginate(query, {
      page,
      limit,
      sort: { status: -1 },
      populate: ['user', 'menu'],
    });
  }

  async getOrderById(orderId: string): Promise<OrderDocument> {
    return await this.orderModel.findById(orderId);
  }

  async placeOrder(
    user: UserDocument,
    menu: MenuDocument,
    quantity: number,
  ): Promise<OrderDocument> {
    const response = await this.initializePayment({
      email: user.email,
      amount: menu.price,
    });

    const verify = await this.verifyPayment(response?.data?.reference);

    if (!verify.status) throw new BadRequestException('Payment failed!');

    return await this.orderModel.create({ quantity, user, menu });
  }

  async markAsInTransit(order: OrderDocument): Promise<OrderDocument> {
    order.status = OrderEnum.Transit;
    return await order.save();
  }

  async markAsCompleted(order: OrderDocument): Promise<OrderDocument> {
    order.status = OrderEnum.Completed;
    return await order.save();
  }

  async markAsSoftDelete(order: OrderDocument): Promise<OrderDocument> {
    order.softDelete = true;
    return await order.save();
  }

  async initializePayment(payload: PaymentDTO) {
    const initializeOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration().paystack.publicKey}`,
      },
      body: JSON.stringify({
        email: payload.email,
        amount: payload.amount * 100,
      }),
    };

    const response = await fetch(
      'https://api.paystack.co/transaction/initialize',
      initializeOptions,
    );

    return response.json();
  }

  async verifyPayment(reference: string) {
    const verifyOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration().paystack.publicKey}`,
      },
    };

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      verifyOptions,
    );

    return response.json();
  }
}
