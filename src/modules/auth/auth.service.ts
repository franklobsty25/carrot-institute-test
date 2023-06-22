import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/constants/schemas';
import { UserDocument } from '../user/schema/user.schema';
import { CreateUserDTO } from '../user/dto';
import { HelperService } from 'src/common/helpers/helper.service';
import { LoginDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDTO: CreateUserDTO): Promise<any> {
    const { password, confirmPassword } = createUserDTO;

    if (password === confirmPassword) {
      createUserDTO.password = await HelperService.hash(confirmPassword);
    } else {
      throw new BadRequestException('Password do not match');
    }

    const user = await this.userModel.create(createUserDTO);

    const token = await this.signAuthPayload(user);

    return { token };
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const { email, password } = loginDTO;

    const user = await this.userModel
      .findOne({
        email: email,
        softDelete: false,
      })
      .select(['email', 'password']);

    if (!user) throw new NotFoundException(`User with ${email} does not exist`);

    const isValid = await HelperService.verify(password, user.password);

    if (!isValid)
      throw new UnauthorizedException(`User password does not match`);

    const token = await this.signAuthPayload(user);

    return { token };
  }

  async signAuthPayload(user: UserDocument) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel
      .findOne({ email })
      .select(['email', 'password']);

    if (!user) throw new NotFoundException('User does not exist');

    const isValid = HelperService.verify(password, user.password);

    if (!isValid)
      throw new UnauthorizedException(`User password does not match`);

    return user;
  }
}
