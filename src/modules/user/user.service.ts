import { Injectable } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schemas';
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { HelperService } from 'src/common/helpers/helper.service';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER) private readonly userModel: PaginateModel<UserDocument>,
  ) {}

  async fetchAllUsers(): Promise<PaginateResult<UserDocument>> {
    return await this.userModel.paginate(
      { softDelete: false },
      { sort: { firstName: -1 } },
    );
  }

  async searchUsers(search?: string) {
    let query: FilterQuery<UserDocument> = { softDelete: false };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $option: 'i' } },
        { lastNameName: { $regex: search, $option: 'i' } },
        { email: { $regex: search, $option: 'i' } },
      ];
    }

    return await this.userModel.paginate(query, { sort: { firstName: -1 } });
  }

  async createUser(userDTO: CreateUserDTO) {
    const { password } = userDTO;

    userDTO.password = await HelperService.hash(password);

    const UserDocument = await this.userModel.create(userDTO);

    return UserDocument;
  }

  async updateUser(userId: string, updateUserDTO: UpdateUserDTO) {
    const { password } = updateUserDTO;

    if (!isEmpty(password)) {
      updateUserDTO.password = await HelperService.hash(password);
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId, softDelete: false },
      { $set: updateUserDTO },
      { new: true, upsert: true },
    );

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId, softDelete: false },
      { $set: { softDelete: true } },
      { new: true },
    );

    return user;
  }
}
