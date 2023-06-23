import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schemas';
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose';
import { FilterUserDTO, UpdateUserDTO } from './dto';
import { HelperService } from 'src/common/helpers/helper.service';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER) private readonly userModel: PaginateModel<UserDocument>,
  ) {}

  async fetchUsers(
    payload?: FilterUserDTO,
  ): Promise<PaginateResult<UserDocument>> {
    const { page = 1, limit = 10, search } = payload;

    const query: FilterQuery<UserDocument> = { softDelete: false };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $option: 'i' } },
        { lastNameName: { $regex: search, $option: 'i' } },
        { email: { $regex: search, $option: 'i' } },
      ];
    }

    return await this.userModel.paginate(query, {
      page,
      limit,
      sort: { firstName: -1 },
      populate: [{ path: 'menu' }],
    });
  }

  async authenticateUser(userId: string) {
    return this.userModel
      .findOne({ _id: userId, softDelete: false })
      .select('+password');
  }

  async updateUser(
    userId: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserDocument> {
    const { password } = updateUserDTO;

    if (!isEmpty(password)) {
      updateUserDTO.password = await HelperService.hash(password);
    }

    const user = await this.userModel
      .findOneAndUpdate(
        { _id: userId, softDelete: false },
        { $set: updateUserDTO },
        { new: true },
      )
      .select('-password');

    if (!user)
      throw new NotFoundException(`User with ${userId} does not exist`);

    return user;
  }

  async softDeleteUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId, softDelete: false },
      { $set: { softDelete: true } },
      { new: true },
    );

    if (!user)
      throw new NotFoundException(`User with ${userId} does not exist`);

    return user;
  }

  async sellerOrBuyer(user: UserDocument, role: string) {
    return await this.userModel.findByIdAndUpdate(
      user._id,
      { $set: { role } },
      { new: true },
    );
  }
}
